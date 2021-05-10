import { Static, Type } from '@sinclair/typebox';

import { User } from '../model';
import { DefineRouteGeneric, RouteFunc } from './types';
import { ajv, goodUsernameRegex } from './Utils';

export const Auth: RouteFunc = (fastify, _opts, done) => {
  fastify.get('/', (_req, res) => {
    res.send('/auth');
  });

  const SignUpBodySchema = Type.Object({
    email: Type.String({ format: 'email' }),
    username: Type.String(Type.RegEx(goodUsernameRegex)),
    password: Type.String({
      description: 'Hashed (SHA256) user password with salt',
    }),
    passwordConfirmation: Type.String({
      description: 'Hashed (SHA256) user password confirmation with salt',
    }),
  });

  type SignUpRouteGeneric = DefineRouteGeneric<{
    Body: Static<typeof SignUpBodySchema>;
  }>;

  const signUpBodyValidate = ajv.compile(SignUpBodySchema);

  fastify.post<SignUpRouteGeneric>('/signup', async function (req, res) {
    /**
     * check if body empty
     */
    if (!req.body) {
      res.status(400).send({
        msg: 'no body',
        validation_error: [],
      });

      return;
    }

    const valid = signUpBodyValidate(req.body);

    if (!valid) {
      res.status(400).send({
        msg: 'body not valid',
        validation_error: signUpBodyValidate.errors ?? [],
      });

      return;
    }

    const email: string = req.body.email;
    const username: string = req.body.username;
    const password: string = req.body.password;
    const passwordConfirmation: string = req.body.passwordConfirmation;

    /**
     * check if password == password confirmation
     */
    if (password !== passwordConfirmation) {
      // Bad Request
      res.status(400).send({
        msg: 'password != passwordConfirmation',
        validation_errors: signUpBodyValidate.errors ?? [],
      });

      return;
    }

    /**
     * check if username is taken
     */
    const exists = await User.exists({ username });

    if (exists) {
      // Bad Request
      res.status(409).send({
        msg: `username ${username} already taken`,
      });

      return;
    }

    const user = new User({
      email,
      username,
      password,
    });

    await user.save();
    res.status(200).send();
  });

  fastify.post('/signin', async function (_req, _res) {
    //   TODO: implement signin
    _res.send('hello');
  });

  fastify.post('/signout', async function (_req, _res) {
    //   TODO: implement signout
  });

  done();
};
