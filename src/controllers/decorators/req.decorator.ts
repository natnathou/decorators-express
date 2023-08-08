import 'reflect-metadata';

import { MetadataKey } from '../constants';


export const reqDecorate = (prototype: Object, propertyKey: string, parameterIndex: number) => {
  Reflect.defineMetadata(MetadataKey.req, parameterIndex, prototype, propertyKey);
};
export function Req() {
  return reqDecorate;
}
