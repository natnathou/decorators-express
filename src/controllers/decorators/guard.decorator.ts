import 'reflect-metadata';
import { MetadataKey } from "../constants";
import {Request, Response} from "express";

export type GuardFncType = (req: Request, res: Response)=> boolean
export function Guard(guardFnc: GuardFncType){
    return function (prototype: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata(MetadataKey.middlewares , guardFnc, prototype, propertyKey);
    }
}
