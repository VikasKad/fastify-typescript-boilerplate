import fp from 'fastify-plugin';
import cors from '@fastify/cors';

async function corsPlugin(fastify, opts) {
    fastify.register(cors, {
        origin: '*',
        methods: ['GET', POST', 'PUT', 'DELETE'],
  });
}

export default fp(corsPlugin);
