import 'reflect-metadata';

import { MetadataKey } from '../constants';


export const nextDecorate = (prototype: Object, propertyKey: string, parameterIndex: number) => {
  Reflect.defineMetadata(MetadataKey.req, parameterIndex, prototype, propertyKey);
};
export function Next() {
  return nextDecorate;
}
