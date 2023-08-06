import 'reflect-metadata';
import { MetadataKey } from "../constants";
import { ParamMetadata } from "./param.decorator";

export interface QueryMetadata extends ParamMetadata{}

export function Query(name: string){
    return function (prototype: Object, propertyKey: string, parameterIndex: number) {
      const queryMetadata = Reflect.getMetadata(MetadataKey.query, prototype, propertyKey) || [];
        Reflect.defineMetadata(MetadataKey.query , [...queryMetadata, {index: parameterIndex, name}], prototype, propertyKey);
      };
}
