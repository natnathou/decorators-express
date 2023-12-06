import 'reflect-metadata';

import type { RequestHandler } from 'express-serve-static-core';
import { MetadataKey } from '../constants';

export function Use(middleware: RequestHandler) {
  return function (target: any, propertyKey?: string, descriptor?: PropertyDescriptor) {
    if (propertyKey && descriptor) {
      const middlewares: RequestHandler[] = Reflect.getMetadata(MetadataKey.middlewares, target, propertyKey) || [];
      middlewares.push(middleware);
      const prototype = target;
      Reflect.defineMetadata(MetadataKey.middlewares, middlewares, prototype, propertyKey);
    } else {
      const constructor = target;
      const prototypeKeys = Object.getOwnPropertyNames(constructor.prototype).filter((p) => p !== 'constructor');
      for (const key of prototypeKeys) {
        const middlewares: RequestHandler[] = Reflect.getMetadata(MetadataKey.middlewares, target, key) || [];
        middlewares.push(middleware);
        Reflect.defineMetadata(MetadataKey.middlewares, middlewares, constructor.prototype, key);
      }
    }
  };
}
