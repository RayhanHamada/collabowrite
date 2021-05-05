import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';

import route from './route';

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
  .use('/', route);
