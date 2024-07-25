import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

async function loggerPlugin(fastify: FastifyInstance) {
    fastify.register(require('@fastify/logger'));
}

export default fp(loggerPlugin);
