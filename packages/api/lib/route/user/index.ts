import { RouteFunc } from '../types';

import { CreateUserHandler } from './CreateUser';
import { DeleteUserHandler } from './DeleteUser';

export const UserRoute: RouteFunc = (fastify, _opts, done) => {
  fastify.get('/', (_req, res) => {
    res.status(200).send();
  });

  fastify.post('/', CreateUserHandler);
  fastify.delete('/:id', DeleteUserHandler);
  done();
};
