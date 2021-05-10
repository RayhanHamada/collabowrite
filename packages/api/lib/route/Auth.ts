import { User } from '../model';
import { DefineRouteGeneric, RouteFunc } from './types';

export const Auth: RouteFunc = (fastify, _opts, done) => {
  fastify.get('/', (_req, res) => {
    res.send('/auth');
  });

  type SignUpRouteGeneric = DefineRouteGeneric<{
    Body: {
      email: string;
      username: string;
      password: string;
      passwordConfirmation: string;
    };
  }>;

  fastify.post<SignUpRouteGeneric>('/signup', async function (req, res) {
    /**
     * check if body empty
     */
    if (!req.body) {
      res.status(400).send({
        msg: 'no body',
      });

      return;
    }

    /**
     * check if email empty
     */
    if (!req.body.email || req.body.email === '') {
      res.status(400).send({
        msg: 'email cannot be empty',
      });

      return;
    }

    /**
     * check if email is in right format
     */
    const emailPattern = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailPattern.test(req.body.email)) {
      res.status(400).send({
        msg: 'email is not in right pattern',
      });
    }

    /**
     * check if username empty
     */
    if (!req.body.username || req.body.username === '') {
      res.status(400).send({
        msg: 'username cannot be empty',
      });

      return;
    }

    /**
     * check if password empty
     */
    if (!req.body.password || req.body.password === '') {
      // Bad Request
      res.status(400).send({
        msg: 'password cannot be empty',
      });

      return;
    }

    /**
     * check if password confirmation empty
     */
    if (!req.body.password || req.body.password === '') {
      // Bad Request
      res.status(400).send({
        msg: 'password confirmation cannot be empty',
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
        msg: 'password and password confirmation not match',
      });

      return;
    }

    /**
     * check if password is strong
     * for the pattern see https://www.section.io/engineering-education/password-strength-checker-javascript/
     */
    const strongPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;

    if (!strongPattern.test(password)) {
      res.status(400).send({
        msg: `password should at least 8 character long, 
        has at least one uppercase letter, 
        has at least one lowercase letter, 
        has at least one digit, and 
        has at least one special character`,
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
