import 'reflect-metadata';

import { MetadataKey } from '../constants';


export const resDecorate = (prototype: Object, propertyKey: string, parameterIndex: number) => {
  Reflect.defineMetadata(MetadataKey.res, parameterIndex, prototype, propertyKey);
};
export function Res() {
  return resDecorate;
}
