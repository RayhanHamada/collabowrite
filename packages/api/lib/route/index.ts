import { App } from '@tinyhttp/app';
import { auth } from './Auth';

export default new App()
  .get('/', (_req, res) => {
    res.end(`You're at Home`);
  })
  .use('/auth', auth);
