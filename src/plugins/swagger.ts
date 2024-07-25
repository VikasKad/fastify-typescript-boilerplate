import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';

async function swaggerPlugin(fastify, opts) {
  fastify.register(swagger, {
    routePrefix: '/documentation',
    swagger: {
      info: {
        title: 'Fastify API',
        description: 'API documentation',
        version: '1.0.0',
      },
      host: 'localhost:3000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
    exposeRoute: true,
  });
}

export default fp(swaggerPlugin);
