import { Static, Type } from '@sinclair/typebox';
import { UserModel } from '../../../model';

import { CustomHandler, DefineRouteGeneric } from '../../types';
import { ajv, createBadResponse, createGoodResponse } from '../../Utils';

export const CreateDocumentAccessDataParamsSchema = Type.Object({
  userID: Type.String({ description: 'User ID' }),
});

export const CreateDocumentAccessDataBodySchema = Type.Object(
  {
    docID: Type.String({ description: 'Document ID' }),
  },
  {
    description: 'CreateDocumentAccessData Body',
  }
);

export type CreateDocumentAccessDataRouteGeneric = DefineRouteGeneric<{
  Params: Static<typeof CreateDocumentAccessDataParamsSchema>;
  Body: Static<typeof CreateDocumentAccessDataBodySchema>;
}>;

const validateSchema = ajv.compile(
  Type.Object({
    Params: CreateDocumentAccessDataParamsSchema,
    Body: CreateDocumentAccessDataBodySchema,
  })
);

export const CreateDocumentAccessDataHandler: CustomHandler<CreateDocumentAccessDataRouteGeneric> = async (
  req,
  res
) => {
  const valid = validateSchema(req.body);

  if (!valid) {
    res.status(400).send(
      createBadResponse({
        errorMsg: 'invalid schema',
        errorPayload: validateSchema.errors ?? undefined,
      })
    );
    return;
  }

  await UserModel.updateOne(
    {
      _id: req.params.userID,
    },
    {
      $push: {
        documentAccessDatas: {
          docID: req.body.docID,
          accessRight: 'edit',
          ownershipStatus: 'owner',
        },
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
