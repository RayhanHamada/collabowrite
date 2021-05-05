import { App } from '@tinyhttp/app';

import Auth from './auth';

export default new App().use('/auth', Auth);
