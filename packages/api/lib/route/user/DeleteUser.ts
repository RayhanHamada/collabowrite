import { Static, Type } from '@sinclair/typebox';

import { User, UserModel } from '../../model';
import { ajv, createBadResponse, createGoodResponse } from '../Utils';

import { CustomHandler, DefineRouteGeneric } from '../types';

const DeleteUserParamSchema = Type.Object({
  id: Type.String({ description: 'User id', minLength: 24, maxLength: 24 }),
});

type DeleteUserRouteGeneric = DefineRouteGeneric<{
  Params: Static<typeof DeleteUserParamSchema>;
}>;

const validateSchema = ajv.compile(DeleteUserParamSchema);

export const DeleteUserHandler: CustomHandler<DeleteUserRouteGeneric> = async (
  req,
  res
) => {
  /**
   * validate schema
   */
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

  await UserModel.deleteOne({ _id: req.params.id })
    .then(() => {
      res
        .status(200)
        .send(createGoodResponse({ msg: `user ${req.params.id} deleted` }));
    })
    .catch((err) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(err);
      }

      res
        .status(500)
        .send(
          createBadResponse({ errorMsg: `failed delete user ${req.params.id}` })
        );
    });
};
