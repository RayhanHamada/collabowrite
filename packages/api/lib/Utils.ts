import { logger } from '@tinyhttp/logger';

export const appLogger = logger({
  emoji: true,
  output: {
    callback: console.log,
    color: true,
  },
  timestamp: true,
});
