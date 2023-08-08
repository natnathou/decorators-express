import 'reflect-metadata';

import { MetadataKey } from '../constants';

export interface BodyMetadata {
  index: number;
  names?: string[];
}

export const bodyDecorate = (names?: string[]) => (prototype: Object, propertyKey: string, parameterIndex: number) =>{
  Reflect.defineMetadata(MetadataKey.body, { index: parameterIndex, names } as BodyMetadata, prototype, propertyKey);
};


export function Body(names?: string[]) {
  return bodyDecorate(names);
}


