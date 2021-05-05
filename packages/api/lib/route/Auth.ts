import { App } from '@tinyhttp/app';

export const auth = new App()
  .get('/', (_req, res) => {
    res.end('/auth');
  })
  .post('/signup', (_req, _res) => {
    // TODO: implement signup
  })
  .post('/signin', (_req, _res) => {
    // TODO: implement signin
  })
  .post('signout', (_req, _res) => {
    // TODO: implement signout
  });
