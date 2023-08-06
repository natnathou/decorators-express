import 'reflect-metadata';
import { MetadataKey } from "../constants";
export function Body(){
    return function (prototype: Object, propertyKey: string, parameterIndex: number) {
        Reflect.defineMetadata(MetadataKey.body , parameterIndex, prototype, propertyKey);
      };
}
