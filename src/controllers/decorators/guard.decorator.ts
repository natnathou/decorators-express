import 'reflect-metadata';

import type { Request, Response } from 'express';
import { MetadataKey } from '../constants';

export type GuardFncType = (req: Request, res: Response)=> boolean;
export function Guard(guardFnc: GuardFncType) {
  return function (target: any, propertyKey?: string, descriptor?: PropertyDescriptor) {
    if (propertyKey && descriptor) {
      const prototype = target;
      Reflect.defineMetadata(MetadataKey.guard, guardFnc, prototype, propertyKey);
    } else {
      const constructor = target;
      const prototypeKeys = Object.getOwnPropertyNames(constructor.prototype).filter((p) => p !== 'constructor');
      for (const key of prototypeKeys) {
        Reflect.defineMetadata(MetadataKey.guard, guardFnc, constructor.prototype, key);
      }
    }
  };
}
