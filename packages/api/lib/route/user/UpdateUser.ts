import { Static, Type } from '@sinclair/typebox';

import { User } from '../../model';
import { ajv } from '../Utils';

import { CustomHandler, DefineRouteGeneric } from '../types';

const UpdateUserParamScheme = Type.Object({
  id: Type.RegEx(/^(?!\s*$).+/, { description: 'User id' }),
});

const UpdateUserBodyScheme = Type.Object({
  email: Type.String({ description: 'User email' }),
  username: Type.String({ description: 'User name' }),
  hashedPassword: Type.String({ description: `User's hashed password` }),
  loggedIn: Type.Boolean({ description: 'User current login status' }),
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
    res.status(400).send(validateSchema.errors);
    return;
  }

  await User.findOne({
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
        res.status(200).send();
      }
    })
    .catch((err) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(err);
      }

      res.status(500).send();
    });
};
