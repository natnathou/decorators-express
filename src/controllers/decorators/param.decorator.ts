import 'reflect-metadata';
import { MetadataKey } from "../constants";

export interface ParamMetadata{ 
  index: number; 
  name: string
}

export function Param(name: string){
    return function (prototype: Object, propertyKey: string, parameterIndex: number) {
      const paramMetadata = Reflect.getMetadata(MetadataKey.param, prototype, propertyKey) || [];
        Reflect.defineMetadata(MetadataKey.param , [...paramMetadata, {index: parameterIndex, name}], prototype, propertyKey);
      };
}
