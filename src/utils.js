// Note: this only works on the server side
export function getNetlifyContext() {
    return process.env.CONTEXT;
}