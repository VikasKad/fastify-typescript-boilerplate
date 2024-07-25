import { FastifyRequest, FastifyReply } from 'fastify';

async function healthCheck(request: FastifyRequest, reply: FastifyReply) {
    reply.send({ status: 'ok' });
}

export default healthCheck;
