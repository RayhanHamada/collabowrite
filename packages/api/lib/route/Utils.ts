/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Ajv, { ErrorObject } from 'ajv';
import addFormats from 'ajv-formats';
import { O } from 'ts-toolbelt';

export const ajv = addFormats(new Ajv(), [
  'date-time',
  'time',
  'date',
  'email',
  'hostname',
  'ipv4',
  'ipv6',
  'uri',
  'uri-reference',
  'uuid',
  'uri-template',
  'json-pointer',
  'relative-json-pointer',
  'regex',
])
  .addKeyword('kind')
  .addKeyword('modifier');

/**
 * @description https://emailregex.com/
 */
export const goodEmailRegex = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * @description https://stackoverflow.com/a/12019115/11065299
 */
export const goodUsernameRegex = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

/**
 * @description https://www.section.io/engineering-education/password-strength-checker-javascript/
 */
export const goodPasswordRegex = /^[A-Fa-f0-9]{64}$/;

export const makeResponse = (
  msg: string,
  validationErrors?:
    | ErrorObject<string, Record<string, unknown>, unknown>[]
    | null
) => ({
  msg,
  validation_errors: validationErrors,
});

/**
 * @description good response
 */
export const createGoodResponse = <P extends { payload: unknown }>(
  payload: P
) => payload;

/**
 * @description bad response
 */
export const createBadResponse = <E extends { errorMsg: string }>(error?: E) =>
  error ?? { errorMsg: 'No Message' };
