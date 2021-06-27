import { RouteFunc } from '../types';

import { CreateUserBodySchema, CreateUserHandler } from './CreateUser';
import { DeleteUserHandler, DeleteUserParamSchema } from './DeleteUser';
import {
  CreateDocumentAccessDataBodySchema,
  CreateDocumentAccessDataHandler,
} from './document-access-data/CreateDocumentAccessData';
import {
  GetDocumentAccessDatasHandler,
  GetDocumentAccessDatasParamsSchema,
} from './document-access-data/GetDocumentAccessDatas';
import {
  UpdateDocumentAccessDataBodySchema,
  UpdateDocumentAccessDataHandler,
  UpdateDocumentAccessDataParamSchema,
} from './document-access-data/UpdateDocumentAccessData';
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

  /**
   * document access data
   */
  fastify.post(
    '/:userID/document-access-data',
    {
      schema: {
        body: CreateDocumentAccessDataBodySchema,
      },
    },
    CreateDocumentAccessDataHandler
  );

  fastify.put(
    '/:userID/document-access-data/:documentAccessDataID',
    {
      schema: {
        params: UpdateDocumentAccessDataParamSchema,
        body: UpdateDocumentAccessDataBodySchema,
      },
    },
    UpdateDocumentAccessDataHandler
  );

  fastify.get(
    '/:userID/document-access-data',
    {
      schema: {
        params: GetDocumentAccessDatasParamsSchema,
      },
    },
    GetDocumentAccessDatasHandler
  );

  fastify.get(
    '/:userID/document-access-data/:docID',
    {
      schema: {
        params: GetDocumentAccessDataParamsSchema,
      },
    },
    GetDocumentAccessDataHandler
  );

  done();
};
