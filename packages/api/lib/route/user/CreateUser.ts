import { Static, Type } from '@sinclair/typebox';
import { User } from '../../model';

import { CustomHandler, DefineRouteGeneric } from '../types';
import { ajv, goodUsernameRegex } from '../Utils';

const CreateUserSchema = Type.Object(
  {
    email: Type.String({ format: 'email' }),
    username: Type.String(Type.RegEx(goodUsernameRegex)),
    hashedPassword: Type.String({
      description: 'Hashed (SHA256) user password with salt',
    }),
  },
  {
    description: 'POST /users',
  }
);

type CreateUserRouteGeneric = DefineRouteGeneric<{
  Body: Static<typeof CreateUserSchema>;
}>;

const validateSchema = ajv.compile(CreateUserSchema);

export const CreateUser: CustomHandler<CreateUserRouteGeneric> = async (
  req,
  res
) => {
  const valid = validateSchema(req.body);

  if (!valid) {
    res.status(400).send(validateSchema.errors);
  }

  await new User({
    email: req.body.email,
    username: req.body.username,
    hashedPassword: req.body.hashedPassword,
    loggedIn: true,
  })
    .save()
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(err);
      }

      res.status(500).send();
    });
};
