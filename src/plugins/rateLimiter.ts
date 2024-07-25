import fp from 'fastify-plugin';
import rateLimit from '@fastify/rate-limit';
import { FastifyInstance } from 'fastify';

async function rateLimiterPlugin(fastify: FastifyInstance, opts: any) {
    fastify.register(rateLimit, {
        max: 100,
        timeWindow: '1 minute',
    });
}

export default fp(rateLimiterPlugin);
