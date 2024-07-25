import fp from 'fastify-plugin';
import rateLimit from '@fastify/rate-limit';

async function rateLimiterPlugin(fastify, opts) {
    fastify.register(rateLimit, {
        max: 100,
        timeWindow: '1 minute',
    });
}

export default fp(rateLimiterPlugin);
