import { Static, Type } from '@sinclair/typebox';
import { User } from '../../model';
import jwt from 'jsonwebtoken';

import { CustomHandler, DefineRouteGeneric } from '../types';

const NewSessionBodySchema = Type.Object(
  {
    username: Type.String({ description: 'User name' }),
    hashedPassword: Type.String({
      description: 'Hashed (SHA256) user password with salt',
    }),
  },
  {
    description: 'NewSession Body',
  }
);

type NewSessionRouteGeneric = DefineRouteGeneric<{
  Body: Static<typeof NewSessionBodySchema>;
}>;

export const NewSessionHandler: CustomHandler<NewSessionRouteGeneric> = async (
  req,
  res
) => {
  const user = await User.findOne({ username: req.body.username });

  /**
   * check if user exists
   */
  if (!user) {
    res.status(400).send({
      msg: 'invalid username or password',
    });
    return;
  }

  /**
   * check if hashed password same as in the database
   */
  if (user?.hashedPassword !== req.body.hashedPassword) {
    res.status(400).send({
      msg: 'invalid username or password',
    });

    return;
  }

  if (user.loggedIn) {
    res.status(200).send({
      msg: 'Already logged in',
    });
    return;
  }

  user.loggedIn = true;

  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '1hr',
    }
  );

  await user.save();

  res.status(200).send({
    token,
  });
};
