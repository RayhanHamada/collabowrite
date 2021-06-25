import { Static, Type } from '@sinclair/typebox';

import { DocumentModel } from '../../model';
import { ajv, createBadResponse, createGoodResponse } from '../Utils';

import { CustomHandler, DefineRouteGeneric } from '../types';

export const UpdateDocumentParamSchema = Type.Object({
  id: Type.String({ description: 'User id', minLength: 24, maxLength: 24 }),
});

export const UpdateDocumentBodySchema = Type.Object({
  email: Type.Optional(Type.String({ description: 'User email' })),
  username: Type.Optional(Type.String({ description: 'User name' })),
  statusOnline: Type.Optional(
    Type.Union([Type.Literal('online'), Type.Literal('offline')])
  ),
});

export type UpdateDocumentRouteGeneric = DefineRouteGeneric<{
  Params: Static<typeof UpdateDocumentParamSchema>;
  Body: Static<typeof UpdateDocumentBodySchema>;
}>;

const validateSchema = ajv.compile(
  Type.Object({
    Params: UpdateDocumentParamSchema,
    Body: UpdateDocumentBodySchema,
  })
);

export const UpdateDocumentHandler: CustomHandler<UpdateDocumentRouteGeneric> = async (
  req,
  res
) => {
  const valid = validateSchema({
    Params: req.params,
    Body: req.body,
  });

  if (!valid) {
    res.status(400).send(
      createBadResponse({
        errorMsg: 'invalid schema',
        errorPayload: validateSchema.errors ?? undefined,
      })
    );
    return;
  }

  await DocumentModel.findOne({
    _id: req.params.id,
  })
    .then(async (doc) => {
      if (doc) {
        /**
         * update and save user
         */
        await doc.update({
          ...req.body,
        });

        await doc.save();
        res.status(200).send(createGoodResponse({ msg: 'success' }));
      }
    })
    .catch((err) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(err);
      }

      res.status(500).send(createBadResponse({ errorMsg: 'failed' }));
    });
};
