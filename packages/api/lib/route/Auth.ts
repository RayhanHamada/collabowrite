import { App } from '@tinyhttp/app';

export const auth = new App().get('/', (_req, res) => {
  res.end('/auth');
});
