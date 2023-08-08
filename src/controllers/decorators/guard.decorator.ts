import 'reflect-metadata';

import type { Request, Response } from 'express';
import { MetadataKey } from '../constants';

export type GuardFncType = (req: Request, res: Response)=> boolean;
export function Guard(guardFnc: GuardFncType) {
  return function (prototype: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKey.middlewares, guardFnc, prototype, propertyKey);
  };
}
