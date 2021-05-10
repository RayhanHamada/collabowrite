import { Auth } from './Auth';
import { RouteFunc } from './types';

const route: RouteFunc = (fastify, opts, done) => {
  fastify.register(Auth, { prefix: '/auth' });
  done();
};

export default route;
