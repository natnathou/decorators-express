import 'reflect-metadata';
import { MetadataKey } from "../constants";

export function Res(){
    return function (prototype: Object, propertyKey: string, parameterIndex: number) {
        Reflect.defineMetadata(MetadataKey.res , parameterIndex, prototype, propertyKey);
      };
}
