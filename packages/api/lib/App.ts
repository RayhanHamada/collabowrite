import { fastify } from 'fastify';

import route from './route';

export const app = fastify({ logger: true });

app.register(route, { prefix: '/api' });
