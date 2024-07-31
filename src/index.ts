import fastify from 'fastify';
import config from './config';
import { asClass, createContainer, InjectionMode } from 'awilix';
import { fastifyAwilixPlugin } from 'fastify-awilix';

import errorHandler from './plugins/errorHandler';
import dbConnector from './plugins/dbConnector';
import loggerPlugin from './plugins/logger';
import ajvPlugin from './plugins/ajv';
import corsPlugin from './plugins/cors';
import rateLimiterPlugin from './plugins/rateLimiter';
import jwtAuthPlugin from './plugins/jwtAuth';
import swaggerPlugin from './plugins/swagger';
import redisPlugin from './plugins/redis';
import websocketPlugin from './plugins/websocket';
import healthCheck from './middlewares/healthCheck';
import orderRoutesV1 from './routes/v1/order';
import orderService from './services/orderService';

const server = fastify({ logger: true });

// Create DI container
const container = createContainer({
    injectionMode: InjectionMode.PROXY,
});

container.register({
    orderService: asClass(orderService).singleton(),
});

server.register(fastifyAwilixPlugin, { container });
server.register(require('@fastify/helmet'));
server.register(errorHandler);
server.register(dbConnector, { dbUrl: config.dbUrl });
server.register(loggerPlugin);
server.register(ajvPlugin);
server.register(corsPlugin);
server.register(rateLimiterPlugin);
server.register(jwtAuthPlugin);
server.register(swaggerPlugin);
server.register(redisPlugin);
server.register(websocketPlugin);

server.get('/health', healthCheck);

server.register(orderRoutesV1, { prefix: '/api/v1' });

const start = async () => {
    try {
        await server.listen(config.port);
        server.log.info(`Server running at http://localhost:${config.port}`);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();
