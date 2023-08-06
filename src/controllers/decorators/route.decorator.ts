import 'reflect-metadata';
import { RoutesTypesKeys, MetadataKey } from "../constants";

function route(routeType: RoutesTypesKeys){   
    return function(path: string){
        return function (prototype: any, propertyKey: string, descriptor: PropertyDescriptor) {
            Reflect.defineMetadata(MetadataKey.path , path, prototype, propertyKey);
            Reflect.defineMetadata(MetadataKey.routeType , routeType, prototype, propertyKey);
          };
    }
    
}


export const Get = route(RoutesTypesKeys.get);
export const Post = route(RoutesTypesKeys.post);
export const Patch = route(RoutesTypesKeys.post);
export const Put = route(RoutesTypesKeys.put);
export const Delete = route(RoutesTypesKeys.delete);
export const Options = route(RoutesTypesKeys.options);
export const Head = route(RoutesTypesKeys.head);
