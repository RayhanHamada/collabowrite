import { Handler } from '@tinyhttp/app';
import { User } from '../../model';

export const SignUp: Handler = async (req, res) => {
  /**
   * check if body empty
   */
  if (!req.body) {
    res
      .status(400)
      .json({
        msg: 'no body',
      })
      .end();

    return;
  }

  /**
   * check if email empty
   */
  if (!req.body.email || req.body.email === '') {
    res
      .status(400)
      .json({
        msg: 'email cannot be empty',
      })
      .end();

    return;
  }

  /**
   * check if email is in right format
   */
  const emailPattern = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emailPattern.test(req.body.email)) {
    res
      .status(400)
      .json({
        msg: 'email is not in right pattern',
      })
      .end();
  }

  /**
   * check if username empty
   */
  if (!req.body.username || req.body.username === '') {
    res
      .status(400)
      .json({
        msg: 'username cannot be empty',
      })
      .end();

    return;
  }

  /**
   * check if password empty
   */
  if (!req.body.password || req.body.password === '') {
    // Bad Request
    res
      .status(400)
      .json({
        msg: 'password cannot be empty',
      })
      .end();

    return;
  }

  /**
   * check if password confirmation empty
   */
  if (!req.body.password || req.body.password === '') {
    // Bad Request
    res
      .status(400)
      .json({
        msg: 'password confirmation cannot be empty',
      })
      .end();

    return;
  }

  const email: string = req.body.email;
  const username: string = req.body.username;
  const password: string = req.body.password;
  const passwordConfirmation: string = req.body.passwordConfirmation;

  /**
   * check if password == password confirmation
   */
  if (password !== passwordConfirmation) {
    // Bad Request
    res
      .status(400)
      .json({
        msg: 'password and password confirmation not match',
      })
      .end();

    return;
  }

  /**
   * check if password is strong
   * for the pattern see https://www.section.io/engineering-education/password-strength-checker-javascript/
   */
  const strongPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;

  if (!strongPattern.test(password)) {
    res
      .status(400)
      .json({
        msg: `password should at least 8 character long, 
      has at least one uppercase letter, 
      has at least one lowercase letter, 
      has at least one digit, and 
      has at least one special character`,
      })
      .end();

    return;
  }

  /**
   * check if username is taken
   */
  const exists = await User.exists({ username });

  if (!exists) {
    // Bad Request
    res
      .status(409)
      .json({
        msg: 'username already taken',
      })
      .end();

    return;
  }

  const user = new User({
    email,
    username,
    password,
  });

  await user.save();
};
