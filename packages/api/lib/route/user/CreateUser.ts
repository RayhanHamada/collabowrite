import { Static, Type } from '@sinclair/typebox';
import { UserModel } from '../../model';

import { CustomHandler, DefineRouteGeneric } from '../types';
import {
  ajv,
  createBadResponse,
  createGoodResponse,
  goodUsernameRegex,
} from '../Utils';

const CreateUserBodySchema = Type.Object(
  {
    email: Type.String({ format: 'email', description: 'User email' }),
    username: Type.String(
      Type.RegEx(goodUsernameRegex, { description: 'User name' })
    ),
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
    res.status(400).send(
      createBadResponse({
        errorMsg: 'invalid schema',
        errorPayload: validateSchema.errors ?? undefined,
      })
    );
    return;
  }

  /**
   * check for pre-existing username
   */
  const exists = await UserModel.exists({ username: req.body.username })
    .then((v) => v)
    .catch((err) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(err);
      }

      res
        .status(500)
        .send(createBadResponse({ errorMsg: `failed create user` }));
    });

  if (exists) {
    res.status(409).send(
      createBadResponse({
        errorMsg: `username ${req.body.username} already taken`,
      })
    );

    return;
  }

  await UserModel.create({
    email: req.body.email,
    username: req.body.username,
  })

    .then(() => {
      res
        .status(200)
        .send(
          createGoodResponse({ msg: `user '${req.body.username}' created !` })
        );
    })
    .catch((err) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(err);
      }

      res.status(500).send(
        createBadResponse({
          errorMsg: `create user ${req.body.username} failed.`,
        })
      );
    });
};
