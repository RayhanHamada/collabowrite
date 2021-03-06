import { Static, Type } from '@sinclair/typebox';
import { UserModel } from '../../model';
import { CustomHandler, DefineRouteGeneric } from '../types';
import { ajv, createBadResponse, createGoodResponse } from '../Utils';

export const GetUsersQuerySchema = Type.Object(
  {
    skip: Type.Optional(
      Type.Number({ description: 'take from number', minimum: 0, default: 0 })
    ),
    limit: Type.Optional(
      Type.Integer({
        description: 'list limit',
      })
    ),
  },
  {
    description: 'GetUser query',
  }
);

export type GetUsersRouteGeneric = DefineRouteGeneric<{
  Querystring: Static<typeof GetUsersQuerySchema>;
}>;

const validateSchema = ajv.compile(GetUsersQuerySchema);

export const GetUsersHandler: CustomHandler<GetUsersRouteGeneric> = async (
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

  await UserModel.find({}, undefined, {
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
