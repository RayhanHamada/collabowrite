import { Static, Type } from '@sinclair/typebox';

import { User } from '../../model';
import { ajv } from '../Utils';

import { CustomHandler, DefineRouteGeneric } from '../types';

const DeleteUserParamSchema = Type.Object({
  id: Type.RegEx(/^(?!\s*$).+/, { description: 'User id' }),
});

type DeleteUserRouteGeneric = DefineRouteGeneric<{
  Params: Static<typeof DeleteUserParamSchema>;
}>;

const validateSchema = ajv.compile(DeleteUserParamSchema);

export const DeleteUserHandler: CustomHandler<DeleteUserRouteGeneric> = async (
  req,
  res
) => {
  /**
   * validate schema
   */
  const valid = validateSchema(req.params);

  if (!valid) {
    res.status(400).send(validateSchema.errors);
    return;
  }

  await User.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(err);
      }

      res.status(500).send();
    });
};
