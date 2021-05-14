import { RouteFunc } from '../types';
import { NewSessionHandler } from './New';

export const SessionRoute: RouteFunc = (fastify, _opts, done) => {
  fastify.post('/new', NewSessionHandler);

  done();
};
