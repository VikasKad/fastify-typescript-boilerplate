import fp from 'fastify-plugin';
import fastifyWebSocket from '@fastify/websocket';

async function websocketPlugin(fastify, opts) {
    fastify.register(fastifyWebSocket);
}

export default fp(websocketPlugin);
