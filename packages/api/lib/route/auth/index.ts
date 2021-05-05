import { App } from '@tinyhttp/app';

import { SignIn } from './SignIn';
import { SignOut } from './SignOut';
import { SignUp } from './SignUp';

export default new App()
  .get('/', (_req, res) => {
    res.end('/auth');
  })
  .use('/signup', SignUp)
  .use('/signin', SignIn)
  .use('/signout', SignOut);
