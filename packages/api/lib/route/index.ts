import { Auth } from './auth';
import { RouteFunc } from './types';

const route: RouteFunc = (fastify, _opts, done) => {
  fastify.register(Auth, { prefix: '/auth' });
  done();
};

export default route;
