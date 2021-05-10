import { connection } from 'mongoose';
import { createSchema, Type, typedModel } from 'ts-mongoose';

export const User = typedModel(
  'User',
  createSchema({
    username: Type.string({ required: true }),
    email: Type.string({ required: true }),
    password: Type.string({ required: true }),
    loggedIn: Type.boolean({ required: true }),
  }),
  undefined,
  undefined,
  undefined,
  connection
);
