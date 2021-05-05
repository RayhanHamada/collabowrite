import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { cors } from '@tinyhttp/cors';

import route from './route';

export const app = new App()
  .use(cors())
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
