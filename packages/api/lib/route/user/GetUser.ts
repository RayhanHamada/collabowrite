import { Static, Type } from '@sinclair/typebox';
import { User } from '../../model';

import { CustomHandler, DefineRouteGeneric } from '../types';
import { ajv } from '../Utils';

const GetUserParamSchema = Type.Object(
  {
    id: Type.String({ description: 'User id', minLength: 24, maxLength: 24 }),
  },
  {
    description: 'GetUser params',
  }
);

type GetUserRouteGeneric = DefineRouteGeneric<{
  Params: Static<typeof GetUserParamSchema>;
}>;

const validateSchema = ajv.compile(GetUserParamSchema);

export const GetUserHandler: CustomHandler<GetUserRouteGeneric> = async (
  req,
  res
) => {
  const valid = validateSchema(req.params);

  if (!valid) {
    res.status(400).send(validateSchema.errors);
    return;
  }

  /**
   * get user with id
   */
  await User.findOne({ _id: req.params.id })
    .then((u) => {
      if (!u) {
        res.status(404).send({
          msg: `user with id: ${req.params.id} not found`,
        });
      }

      res.status(200).send(u);
    })
    .catch((err) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(err);
      }

      res.status(500).send();
    });
};
