import { Static, Type } from '@sinclair/typebox';
import { UserModel } from '../../../model';

import { CustomHandler, DefineRouteGeneric } from '../../types';
import { ajv, createBadResponse, createGoodResponse } from '../../Utils';

export const GetDocumentAccessDatasParamsSchema = Type.Object({
  userID: Type.String({ description: 'User ID' }),
  docID: Type.String({ description: 'Document ID' }),
});

export type GetDocumentAccessDatasRouteGeneric = DefineRouteGeneric<{
  Params: Static<typeof GetDocumentAccessDatasParamsSchema>;
}>;

const validateSchema = ajv.compile(
  Type.Object({
    Params: GetDocumentAccessDatasParamsSchema,
  })
);

export const GetDocumentAccessDatasHandler: CustomHandler<GetDocumentAccessDatasRouteGeneric> = async (
  req,
  res
) => {
  const valid = validateSchema({
    Params: req.params,
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

  await UserModel.findOne({
    _id: req.params.userID,
    'documentAccessDatas.docID': req.params.docID,
  })
    .then((v) => {
      res.status(200).send(
        createGoodResponse({
          msg: 'success',
          payload: {
            documentAccessDatas: v?.documentAccessDatas ?? [],
          },
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
