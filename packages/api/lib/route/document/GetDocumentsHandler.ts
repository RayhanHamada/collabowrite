import { Static, Type } from '@sinclair/typebox';
import { DocumentModel } from '../../model';
import { CustomHandler, DefineRouteGeneric } from '../types';
import { ajv, createBadResponse, createGoodResponse } from '../Utils';

export const GetDocumentsQuerySchema = Type.Object(
  {
    skip: Type.Optional(
      Type.Integer({
        description: 'skip from index number',
        minimum: 0,
        default: 0,
      })
    ),
    limit: Type.Optional(
      Type.Integer({
        description: 'list limit',
        minimum: 1,
        maximum: 100,
        default: 100,
      })
    ),
  },
  {
    description: 'GetUser query',
  }
);

type GetDocumentsRouteGeneric = DefineRouteGeneric<{
  Querystring: Static<typeof GetDocumentsQuerySchema>;
}>;

const validateSchema = ajv.compile(GetDocumentsQuerySchema);

export const GetDocumentsHandler: CustomHandler<GetDocumentsRouteGeneric> = async (
  req,
  res
) => {
  const valid = validateSchema(req.query);

  if (!valid) {
    res.status(400).send(
      createBadResponse({
        errorMsg: 'invalid schema',
        errorPayload: validateSchema.errors ?? undefined,
      })
    );

    return;
  }

  await DocumentModel.find({}, undefined, {
    skip: req.query.skip,
    limit: req.query.limit,
  })
    .then((docs) => {
      res.status(200).send(
        createGoodResponse({
          msg: 'success',
          payload: { users: docs.map((d) => d.toJSON()) },
        })
      );

      return;
    })
    .catch((err) => {
      if (process.env.NODE_ENV == 'development') {
        console.error(err);
      }

      res.status(500).send(
        createBadResponse({
          errorMsg: 'failed',
        })
      );
    });

  return;
};
