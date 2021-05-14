import { Static, Type } from '@sinclair/typebox';
import { User } from '../../model';

import { CustomHandler, DefineRouteGeneric } from '../types';
import { ajv, goodUsernameRegex } from '../Utils';

const CreateUserBodySchema = Type.Object(
  {
    email: Type.String({ format: 'email', description: 'User email' }),
    username: Type.String(
      Type.RegEx(goodUsernameRegex, { description: 'User name' })
    ),
    hashedPassword: Type.String({
      description: 'Hashed (SHA256) user password with salt',
    }),
  },
  {
    description: 'CreateUser Body',
  }
);

type CreateUserRouteGeneric = DefineRouteGeneric<{
  Body: Static<typeof CreateUserBodySchema>;
}>;

const validateSchema = ajv.compile(CreateUserBodySchema);

export const CreateUserHandler: CustomHandler<CreateUserRouteGeneric> = async (
  req,
  res
) => {
  const valid = validateSchema(req.body);

  if (!valid) {
    res.status(400).send(validateSchema.errors);
    return;
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
