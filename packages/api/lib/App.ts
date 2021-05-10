import { fastify } from 'fastify';
import { fastifyJWT } from 'fastify-jwt';

import route from './route';

export const app = fastify({ logger: true });

app.register(fastifyJWT, {
  secret: process.env.JWT_SECRET as string,
  sign: {
    expiresIn: '1hr',
  },
});

app.register(route, { prefix: '/api' });
