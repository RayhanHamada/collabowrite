import { RouteFunc } from '../types';

import { CreateUserBodySchema, CreateUserHandler } from './CreateUser';
import { DeleteUserHandler, DeleteUserParamSchema } from './DeleteUser';
import { GetUserHandler, GetUserParamSchema } from './GetUser';
import { GetUsersHandler, GetUsersQuerySchema } from './GetUsers';
import {
  UpdateUserBodySchema,
  UpdateUserHandler,
  UpdateUserParamSchema,
} from './UpdateUser';

export const UserRoute: RouteFunc = (fastify, _opts, done) => {
  fastify.get(
    '/',
    {
      schema: {
        querystring: GetUsersQuerySchema,
      },
    },
    GetUsersHandler
  );

  fastify.get(
    '/:id',
    {
      schema: {
        params: GetUserParamSchema,
      },
    },
    GetUserHandler
  );

  fastify.post(
    '/',
    {
      schema: {
        body: CreateUserBodySchema,
      },
    },
    CreateUserHandler
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: DeleteUserParamSchema,
      },
    },
    DeleteUserHandler
  );

  fastify.put(
    '/:id',
    {
      schema: {
        params: UpdateUserParamSchema,
        body: UpdateUserBodySchema,
      },
    },
    UpdateUserHandler
  );

  done();
};
