import { Static, Type } from '@sinclair/typebox';
import { User } from '../../model';

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

  if (!user) {
    res.status(400).send({
      msg: 'invalid username or password',
    });
    return;
  }

  if (user?.hashedPassword !== req.body.hashedPassword) {
    res.status(400).send({
      msg: 'invalid username or password',
    });

    return;
  }

  user.loggedIn = true;

  await user.save();

  const jwtToken = await res.jwtSign({ username: user.username });

  res.status(200).send({
    currentProfile: {
      ...user.toObject(),
      hashedPassword: undefined,
    },
    jwtToken,
  });
};
