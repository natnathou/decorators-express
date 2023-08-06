import 'reflect-metadata';
import { MetadataKey } from "../constants";
export const bodyDecorate = (prototype: Object, propertyKey: string, parameterIndex: number) =>{
    Reflect.defineMetadata(MetadataKey.body , parameterIndex, prototype, propertyKey);
};


export function Body(){
    return bodyDecorate;
}


