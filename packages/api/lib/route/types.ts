import { RouteGenericInterface } from 'fastify/types/route';
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
