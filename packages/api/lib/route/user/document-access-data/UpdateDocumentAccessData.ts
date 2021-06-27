import { Static, Type } from '@sinclair/typebox';

import { ajv, createBadResponse, createGoodResponse } from '../../Utils';

import { CustomHandler, DefineRouteGeneric } from '../../types';
import { UserModel } from '../../../model';

export const UpdateDocumentAccessDataParamSchema = Type.Object({
  userID: Type.String({ description: 'User id' }),
  docID: Type.String({ description: 'document id' }),
});

export const UpdateDocumentAccessDataBodySchema = Type.Object({
  accessRight: Type.Optional(
    Type.Union([Type.Literal('edit'), Type.Literal('view')])
  ),
  onlineStatus: Type.Optional(
    Type.Union([Type.Literal('online'), Type.Literal('offline')])
  ),
  ownershipStatus: Type.Optional(
    Type.Union([Type.Literal('owner'), Type.Literal('guest')])
  ),
});

export type UpdateDocumentAccessDataRouteGeneric = DefineRouteGeneric<{
  Params: Static<typeof UpdateDocumentAccessDataParamSchema>;
  Body: Static<typeof UpdateDocumentAccessDataBodySchema>;
}>;

const validateSchema = ajv.compile(
  Type.Object({
    Params: UpdateDocumentAccessDataParamSchema,
    Body: UpdateDocumentAccessDataBodySchema,
  })
);

export const UpdateDocumentAccessDataHandler: CustomHandler<UpdateDocumentAccessDataRouteGeneric> = async (
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

  // TODO implement update document accessdata
  await UserModel.updateOne(
    {
      _id: req.params.userID,
      'documentAccessDatas.docID': req.params.docID,
    },
    {
      $set: {
        'documentAccessDatas.$.accessRight': req.body.accessRight,
        'documentAccessDatas.$.onlineStatus': req.body.onlineStatus,
        'documentAccessDatas.$.ownershipStatus': req.body.ownershipStatus,
      },
    }
  )
    .then((v) => {
      res.status(200).send(
        createGoodResponse({
          msg: 'success',
        })
      );
      return v;
    })
    .catch((err) => {
      if (process.env.NODE_ENV === 'developement') {
        console.error(err);
      }

      res.status(500).send(createBadResponse({ errorMsg: 'failed' }));
    });
};
