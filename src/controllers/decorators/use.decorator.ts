import 'reflect-metadata';

import type { RequestHandler } from 'express-serve-static-core';
import { MetadataKey } from '../constants';

export function Use(middleware: RequestHandler) {
  return function (prototype: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const middlewares: RequestHandler[] = Reflect.getMetadata(MetadataKey.middlewares, prototype, propertyKey) || [];
    middlewares.push(middleware);
    Reflect.defineMetadata(MetadataKey.middlewares, middlewares, prototype, propertyKey);
  };
}
