import 'reflect-metadata';

import { MetadataKey } from '../constants';
import type { ParamMetadata } from './param.decorator';

export interface QueryMetadata extends ParamMetadata {}

export const queryDecorate = (name: string) => (prototype: Object, propertyKey: string, parameterIndex: number) => {
  const queryMetadata: QueryMetadata[] = Reflect.getMetadata(MetadataKey.query, prototype, propertyKey) || [];
  Reflect.defineMetadata(MetadataKey.query, [...queryMetadata, { index: parameterIndex, name } as QueryMetadata], prototype, propertyKey);
};
export function Query(name: string) {
  return queryDecorate(name);
}
