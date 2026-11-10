import { getContext, getWebSockets, onShutdown, upgradeWebSocket } from '@netlify/server';
import { adjectives, animals, uniqueNamesGenerator } from 'unique-names-generator';
import { REACTIONS } from './reactions.mjs';

// Astro serves the rest of the site, so the server only claims its own corner of it.
export const config = {
    path: '/server/*'
};

const REACTION_COOLDOWN_MS = 150;

// Module scope runs once per process rather than once per request, so all of this is
// remembered between requests. It is gone when the server scales to zero: treat memory
// as a cache, and keep anything that has to survive in Netlify Blobs or Netlify Database.
const instance = {
    name: uniqueNamesGenerator({ dictionaries: [adjectives, animals], separator: '-', length: 2 }),
    requests: 0,
    reactions: 0
};

// Everyone connected to this instance. Netlify can run several instances under load, and
// each one only knows about its own sockets.
function openSockets() {
    return getWebSockets().filter((socket) => socket.readyState === socket.OPEN);
}

function snapshot() {
    return { ...instance, uptime: Math.round(process.uptime()), visitors: openSockets().length };
}

function broadcast(message = {}) {
    const data = JSON.stringify({ ...message, instance: snapshot() });
    for (const socket of openSockets()) socket.send(data);
}

// Tells clients to reconnect straight away, which lands them on a fresh instance.
onShutdown(() => {
    for (const socket of getWebSockets()) socket.close(1012, 'Server restarting');
});

export default async (request) => {
    instance.requests++;
    const { pathname } = new URL(request.url);

    if (pathname === '/server/status') {
        return Response.json(snapshot(), { headers: { 'Cache-Control': 'no-store' } });
    }

    if (pathname === '/server/socket' && request.headers.get('upgrade')?.toLowerCase() === 'websocket') {
        // The idle timeout drops visitors who vanished without closing, so they don't keep the server awake.
        const { socket, response } = upgradeWebSocket(request, { idleTimeout: 30 });
        const from = getContext().geo?.country?.code;
        let lastReactionAt = 0;

        socket.onopen = () => broadcast();
        socket.onclose = () => broadcast();
        socket.onmessage = ({ data }) => {
            // Only known reactions are relayed, so nobody can broadcast arbitrary text.
            if (!REACTIONS.includes(data) || Date.now() - lastReactionAt < REACTION_COOLDOWN_MS) return;
            lastReactionAt = Date.now();
            instance.reactions++;
            broadcast({ reaction: data, from });
        };

        return response;
    }

    return new Response('Not found', { status: 404 });
};
