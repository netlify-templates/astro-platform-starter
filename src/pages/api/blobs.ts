import type { APIRoute } from 'astro';
import { getStore } from '@netlify/blobs';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    const parameters = await request.json();
    const blobStore = getStore('shapes');
    const key = parameters.name;
    await blobStore.setJSON(key, parameters);
    return new Response(
        JSON.stringify({
            message: `Stored shape "${key}"`
        })
    );
};

export const GET: APIRoute = async ({ request }) => {
    const blobStore = getStore({ name: 'shapes', consistency: 'strong' });
    const data = await blobStore.list();
    const keys = data.blobs.map(({ key }) => key);
    return new Response(
        JSON.stringify({
            keys
        })
    );
};
