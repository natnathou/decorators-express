import 'reflect-metadata';
import { MetadataKey } from "../constants";
import {RequestHandler} from "express-serve-static-core";

function Use(middleware: RequestHandler){
    return function (prototype: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const middlewares: RequestHandler[] = Reflect.getMetadata(MetadataKey.middlewares, prototype, propertyKey) || [];
        middlewares.push(middleware);
        Reflect.defineMetadata(MetadataKey.middlewares , middlewares, prototype, propertyKey);
    }
}
