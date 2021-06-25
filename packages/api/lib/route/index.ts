import { UserRoute } from './user';

import { RouteFunc } from './types';
import { DocumentRoute } from './document';

const route: RouteFunc = (fastify, _opts, done) => {
  fastify.register(UserRoute, { prefix: '/users' });
  fastify.register(DocumentRoute, { prefix: '/doc' });

  done();
};

export default route;
