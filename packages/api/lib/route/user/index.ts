import { RouteFunc } from '../types';

import { CreateUserHandler } from './CreateUser';
import { DeleteUserHandler } from './DeleteUser';
import { GetUserHandler } from './GetUser';
import { UpdateUserHandler } from './UpdateUser';

export const UserRoute: RouteFunc = (fastify, _opts, done) => {
  fastify.get('/:id', GetUserHandler);
  fastify.post('/', CreateUserHandler);
  fastify.delete('/:id', DeleteUserHandler);
  fastify.put('/:id', UpdateUserHandler);

  done();
};
