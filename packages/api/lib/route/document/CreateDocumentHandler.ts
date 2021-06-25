import { Static, Type } from '@sinclair/typebox';
import { DocumentModel } from '../../model';

import { CustomHandler, DefineRouteGeneric } from '../types';
import { ajv, createBadResponse, createGoodResponse } from '../Utils';

export const CreateDocumentBodySchema = Type.Object(
  {
    name: Type.String({}),
  },
  {
    description: 'CreateDocument Body',
  }
);

export type CreateDocumentRouteGeneric = DefineRouteGeneric<{
  Body: Static<typeof CreateDocumentBodySchema>;
}>;

const validateSchema = ajv.compile(CreateDocumentBodySchema);

export const CreateDocumentHandler: CustomHandler<CreateDocumentRouteGeneric> = async (
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

  await DocumentModel.create({
    name: req.body.name,
    content: {},
  })
    .then((doc) => {
      res.status(200).send(
        createGoodResponse({
          msg: `success`,
          payload: {
            doc: doc.toJSON(),
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
          errorMsg: `failed`,
        })
      );
    });
};
