import { Static, Type } from '@sinclair/typebox';
import { UserModel } from '../../model';

import { CustomHandler, DefineRouteGeneric } from '../types';
import { ajv, createBadResponse, createGoodResponse } from '../Utils';

const GetUserParamSchema = Type.Object(
  {
    id: Type.String({ description: 'User id', minLength: 24, maxLength: 24 }),
  },
  {
    description: 'GetUser params',
  }
);

type GetUserRouteGeneric = DefineRouteGeneric<{
  Params: Static<typeof GetUserParamSchema>;
}>;

const validateSchema = ajv.compile(GetUserParamSchema);

export const GetUserHandler: CustomHandler<GetUserRouteGeneric> = async (
  req,
  res
) => {
  const valid = validateSchema(req.params);

  if (!valid) {
    res.status(400).send(
      createBadResponse({
        errorMsg: 'invalid schema',
        errorPayload: validateSchema.errors ?? undefined,
      })
    );
    return;
  }

  /**
   * get user with id
   */
  await UserModel.findOne({ _id: req.params.id })
    .then((u) => {
      if (!u) {
        res.status(404).send(
          createGoodResponse({
            msg: `user ${req.params.id} not found`,
          })
        );
      }

      res.status(200).send(
        createGoodResponse({
          msg: 'user found !',
          payload: {
            user: u?.toJSON(),
          },
        })
      );
    })
    .catch((err) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(err);
      }

      res.status(500).send(
        createBadResponse({
          errorMsg: 'failed to find user',
        })
      );
    });
};
