import 'reflect-metadata';
import { MetadataKey } from "../constants";

export interface ParamMetadata{ 
  index: number; 
  name: string
}

export const paramDecorate = (name: string)=>(prototype: Object, propertyKey: string, parameterIndex: number) => {
  const paramMetadata: ParamMetadata[] = Reflect.getMetadata(MetadataKey.param, prototype, propertyKey) || [];
  Reflect.defineMetadata(MetadataKey.param , [...paramMetadata, {index: parameterIndex, name} as ParamMetadata], prototype, propertyKey);
};
export function Param(name: string){
    return paramDecorate(name);
}
