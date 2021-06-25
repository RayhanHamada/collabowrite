import { RouteFunc } from '../types';
import {
  CreateDocumentBodySchema,
  CreateDocumentHandler,
} from './CreateDocumentHandler';
import {
  DeleteDocumentHandler,
  DeleteDocumentParamSchema,
} from './DeleteDocumentHandler';
import { GetDocumentHandler } from './GetDocumentHandler';
import {
  GetDocumentsHandler,
  GetDocumentsQuerySchema,
} from './GetDocumentsHandler';
import {
  UpdateDocumentBodySchema,
  UpdateDocumentHandler,
  UpdateDocumentParamSchema,
} from './UpdateDocumentHandler';

export const DocumentRoute: RouteFunc = (fastify, _opts, done) => {
  fastify.get(
    '/',
    {
      schema: {
        querystring: GetDocumentsQuerySchema,
      },
    },
    GetDocumentsHandler
  );

  fastify.get(
    '/:id',
    {
      schema: {
        params: GetDocumentsQuerySchema,
      },
    },
    GetDocumentHandler
  );

  fastify.post(
    '/',
    {
      schema: {
        body: CreateDocumentBodySchema,
      },
    },
    CreateDocumentHandler
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: DeleteDocumentParamSchema,
      },
    },
    DeleteDocumentHandler
  );

  fastify.put(
    '/:id',
    {
      schema: {
        params: UpdateDocumentParamSchema,
        body: UpdateDocumentBodySchema,
      },
    },
    UpdateDocumentHandler
  );

  done();
};
