import { App } from '@tinyhttp/app';

export const app = new App().get('/', (_req, res) => {
  res.end(`You're at /`);
});
