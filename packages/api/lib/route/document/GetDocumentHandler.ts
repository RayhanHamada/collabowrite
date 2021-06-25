import { Static, Type } from '@sinclair/typebox';
import { DocumentModel } from '../../model';

import { CustomHandler, DefineRouteGeneric } from '../types';
import { ajv, createBadResponse, createGoodResponse } from '../Utils';

const GetDocumentParamSchema = Type.Object(
  {
    id: Type.String({ description: 'User id', minLength: 24, maxLength: 24 }),
  },
  {
    description: 'GetDocument params',
  }
);

type GetDocumentRouteGeneric = DefineRouteGeneric<{
  Params: Static<typeof GetDocumentParamSchema>;
}>;

const validateSchema = ajv.compile(GetDocumentParamSchema);

export const GetDocumentHandler: CustomHandler<GetDocumentRouteGeneric> = async (
  req,
  res
) => {
  const valid = validateSchema(req.params);

  if (!valid) {
    res.status(400).send(
      createBadResponse({
        errorMsg: 'invalid schema',
        errorPayload: validateSchema.errors ?? undefined,
      })
    );
    return;
  }

  /**
   * get user with id
   */
  await DocumentModel.findOne({ _id: req.params.id })
    .then((doc) => {
      if (!doc) {
        res.status(404).send(
          createGoodResponse({
            msg: `user ${req.params.id} not found`,
            payload: {},
          })
        );
      }

      res.status(200).send(
        createGoodResponse({
          msg: 'user found !',
          payload: {
            user: doc?.toJSON(),
          },
        })
      );
    })
    .catch((err) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(err);
      }

      res.status(500).send(
        createBadResponse({
          errorMsg: 'failed to find user',
        })
      );
    });
};
