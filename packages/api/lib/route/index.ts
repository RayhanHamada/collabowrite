import { Auth } from './auth';
import { UserRoute } from './user';
import { SessionRoute } from './session';

import { RouteFunc } from './types';

const route: RouteFunc = (fastify, _opts, done) => {
  fastify.register(Auth, { prefix: '/auth' });
  fastify.register(UserRoute, { prefix: '/users' });
  fastify.register(SessionRoute, { prefix: '/session' });
  done();
};

export default route;
