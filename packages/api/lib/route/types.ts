import { RouteGenericInterface, RouteHandlerMethod } from 'fastify/types/route';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { app } from '../App';

/**
 * @description for making route function
 */
export type RouteFunc = Parameters<typeof app.register>[0];

/**
 * @description for making route generic for specific route
 */
export type DefineRouteGeneric<
  D extends RouteGenericInterface
> = keyof D extends keyof RouteGenericInterface ? D : never;

/**
 * @description defining endpoint handler function
 */
export type CustomHandler<
  D extends RouteGenericInterface
> = keyof D extends keyof RouteGenericInterface
  ? RouteHandlerMethod<Server, IncomingMessage, ServerResponse, D, unknown>
  : never;
