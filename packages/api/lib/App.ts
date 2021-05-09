import { App } from '@tinyhttp/app';
import { cors } from '@tinyhttp/cors';

import route from './route';
import { appLogger } from './Utils';

export const app = new App().use(cors()).use(appLogger).use('/', route);
