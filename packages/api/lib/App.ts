import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';

export const app = new App()
  .use(
    logger({
      emoji: true,
      output: {
        callback: console.log,
        color: true,
      },
      timestamp: true,
    })
  )
  .get('/', (_req, res) => {
    res.end(`You're at Home`);
  });
