import { RouteFunc } from '../types';
import { CreateUser } from './CreateUser';

export const UserRoute: RouteFunc = (fastify, _opts, done) => {
  fastify.get('/', (_req, res) => {
    res.status(200).send();
  });

  fastify.post('/', CreateUser);
  done();
};