import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

async function errorHandler(fastify: FastifyInstance) {
    fastify.setErrorHandler((error, request, reply) => {
        request.log.error(error);
        reply.status(500).send({ error: 'Internal Server Error' });
    });
}

export default fp(errorHandler);
