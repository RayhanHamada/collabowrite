import { Static, Type } from '@sinclair/typebox';

import { DocumentModel } from '../../model';
import { ajv, createBadResponse, createGoodResponse } from '../Utils';

import { CustomHandler, DefineRouteGeneric } from '../types';

export const DeleteDocumentParamSchema = Type.Object({
  id: Type.String({ description: 'User id' }),
});

export type DeleteDocumentRouteGeneric = DefineRouteGeneric<{
  Params: Static<typeof DeleteDocumentParamSchema>;
}>;

const validateSchema = ajv.compile(DeleteDocumentParamSchema);

export const DeleteDocumentHandler: CustomHandler<DeleteDocumentRouteGeneric> = async (
  req,
  res
) => {
  /**
   * validate schema
   */
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

  await DocumentModel.deleteMany({ _id: req.params.id })
    .then(() => {
      res
        .status(200)
        .send(createGoodResponse({ msg: `document ${req.params.id} deleted` }));
    })
    .catch((err) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(err);
      }

      res.status(500).send(
        createBadResponse({
          errorMsg: `failed delete document ${req.params.id}`,
        })
      );
    });
};
