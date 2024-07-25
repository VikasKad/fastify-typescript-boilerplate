import fastify from 'fastify';
import healthCheck from './middlewares/healthCheck';


const server = fastify({ logger: true });
server.get('/health', healthCheck);

const start = async () => {
    try {
        await server.listen(3000);
        console.log('Server running at http://localhost:3000');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

start();
