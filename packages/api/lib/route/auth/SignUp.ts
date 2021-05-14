import { Static, Type } from '@sinclair/typebox';

import { CustomHandler, DefineRouteGeneric } from '../types';
import { ajv, goodUsernameRegex, makeResponse } from '../Utils';
import { User } from '../../model';

const Schema = Type.Object({
  email: Type.String({ format: 'email' }),
  username: Type.String(Type.RegEx(goodUsernameRegex)),
  hashedPassword: Type.String({
    description: 'Hashed (SHA256) user password with salt',
  }),
  hashedPasswordConfirmation: Type.String({
    description: 'Hashed (SHA256) user password confirmation with salt',
  }),
});

type SignUpRouteGeneric = DefineRouteGeneric<{
  Body: Static<typeof Schema>;
}>;

const validateSchema = ajv.compile(Schema);

export const SignUp: CustomHandler<SignUpRouteGeneric> = async function (
  req,
  res
) {
  /**
   * check if body empty
   */
  if (!req.body) {
    res.status(400).send(makeResponse('no body', validateSchema.errors));

    return;
  }

  const valid = validateSchema(req.body);

  if (!valid) {
    res.status(400).send(makeResponse('body not valid', validateSchema.errors));

    return;
  }

  const email: string = req.body.email;
  const username: string = req.body.username;
  const hashedPassword: string = req.body.hashedPassword;
  const hashedPasswordConfirmation: string =
    req.body.hashedPasswordConfirmation;

  /**
   * check if password == password confirmation
   */
  if (hashedPassword !== hashedPasswordConfirmation) {
    // Bad Request
    res
      .status(400)
      .send(
        makeResponse('password != passwordConfirmation', validateSchema.errors)
      );

    return;
  }

  /**
   * check if username is taken
   */
  const exists = await User.exists({ username });

  if (exists) {
    // Bad Request
    res
      .status(409)
      .send(
        makeResponse(
          `username ${username} already taken`,
          validateSchema.errors
        )
      );

    return;
  }

  const user = new User({
    email,
    username,
    hashedPassword,
    loggedIn: true,
  });

  await user.save();
  res.status(200).send();
};
