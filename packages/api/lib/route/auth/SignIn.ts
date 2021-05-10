import { Static, Type } from '@sinclair/typebox';
import { ajv, makeResponse } from '../Utils';

import { CustomHandler, DefineRouteGeneric } from '../types';

const Schema = Type.Object({
  username: Type.String(),
  password: Type.String({
    description: 'Hashed (SHA256) user password with salt',
  }),
});

type RouteGeneric = DefineRouteGeneric<{
  Body: Static<typeof Schema>;
}>;

const validateSchema = ajv.compile(Schema);

export const SignIn: CustomHandler<RouteGeneric> = async function (req, res) {
  /**
   * check if body empty
   */
  if (!req.body) {
    res.status(400).send(makeResponse('no body', validateSchema.errors));

    return;
  }

  const valid = validateSchema(req.body);

  /**
   * check for validation errors
   */
  if (!valid) {
    res.status(400).send(makeResponse('body not valid', validateSchema.errors));

    return;
  }

  // TODO: make user logged in and send signed jwt token that expires in 1 hour
};
