import { Auth } from './auth';
import { UserRoute } from './user';
import { RouteFunc } from './types';

const route: RouteFunc = (fastify, _opts, done) => {
  fastify.register(Auth, { prefix: '/auth' });
  fastify.register(UserRoute, { prefix: '/users' });
  done();
};

export default route;
