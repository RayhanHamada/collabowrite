import { SignUp } from './SignUp';
import { RouteFunc } from '../types';

export const Auth: RouteFunc = (fastify, _opts, done) => {
  fastify.get('/', (_req, res) => {
    res.send('/auth');
  });

  fastify.post('/signup', SignUp);

  fastify.post('/signin', async function (_req, _res) {
    //   TODO: implement signin
    _res.send('hello');
  });

  fastify.post('/signout', async function (_req, _res) {
    //   TODO: implement signout
  });

  done();
};