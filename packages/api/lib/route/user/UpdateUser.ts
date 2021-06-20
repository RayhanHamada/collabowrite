import { Static, Type } from '@sinclair/typebox';

<<<<<<< HEAD
import { UserModel } from '../../model';
=======
import { User, UserModel } from '../../model';
>>>>>>> 4c3ad010edcfdae432bbadbf866f746a1cae5712
import { ajv, createBadResponse, createGoodResponse } from '../Utils';

import { CustomHandler, DefineRouteGeneric } from '../types';

const UpdateUserParamScheme = Type.Object({
  id: Type.String({ description: 'User id', minLength: 24, maxLength: 24 }),
});

const UpdateUserBodyScheme = Type.Object({
  email: Type.Optional(Type.String({ description: 'User email' })),
  username: Type.Optional(Type.String({ description: 'User name' })),
  statusOnline: Type.Optional(
    Type.Union([Type.Literal('online'), Type.Literal('online')])
  ),
});

type UpdateUserRouteGeneric = DefineRouteGeneric<{
  Params: Static<typeof UpdateUserParamScheme>;
  Body: Static<typeof UpdateUserBodyScheme>;
}>;

const validateSchema = ajv.compile(
  Type.Object({
    Params: UpdateUserParamScheme,
    Body: UpdateUserBodyScheme,
  })
);

export const UpdateUserHandler: CustomHandler<UpdateUserRouteGeneric> = async (
  req,
  res
) => {
  const valid = validateSchema({
    Params: req.params,
    Body: req.body,
  });

  if (!valid) {
    res.status(400).send(
      createBadResponse({
        errorMsg: 'invalid schema',
        errorPayload: validateSchema.errors ?? undefined,
      })
    );
    return;
  }

  await UserModel.findOne({
    _id: req.params.id,
  })
    .then(async (user) => {
      if (user) {
        /**
         * update and save user
         */
        await user.update({
          ...req.body,
        });

        await user.save();
        res.status(200).send(createGoodResponse({ msg: 'success' }));
      }
    })
    .catch((err) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(err);
      }

      res.status(500).send(createBadResponse({ errorMsg: 'failed' }));
    });
};
