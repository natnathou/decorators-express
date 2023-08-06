import 'reflect-metadata';
import AppRouter from "../../router";
import { RoutesTypesKeys, MetadataKey } from "../constants";
import { Response, Request } from  'express';
import { ParamMetadata } from "./param.decorator";

export function Controller(globalPath: string){
    return function <T extends { new(...args: any[]): {} }>(constructor: T)  {
      
        const prototypeKeys = Object.getOwnPropertyNames(constructor.prototype);
    
       
        for(let propertyKey of prototypeKeys) {
            
            const routeType: RoutesTypesKeys = Reflect.getMetadata(MetadataKey.routeType, constructor.prototype, propertyKey);
            let path = Reflect.getMetadata(MetadataKey.path, constructor.prototype, propertyKey);
            
            if(path?.[0] !== '/'){
                path += '/';
            }
            if(globalPath?.[0] !== '/'){
                globalPath += '/';
            }
            if(globalPath?.[globalPath?.length -1] === '/'){
                globalPath = globalPath.substring(0, globalPath.length-1);
            }

            if(path && routeType){
                let finalPath = `${globalPath}${path}`
                const router = AppRouter.getInstance();
                router[routeType]( finalPath, function (req: Request, res: Response){
                    const args = setArguments<T>(constructor, propertyKey, req, res);
                    
                    (constructor.prototype[propertyKey] as Function).apply(constructor.prototype, args)
                })
            }

        }
};
}

function setArguments<T extends { new(...args: any[]): {}; }>(constructor: T, propertyKey: string, req: Request, res: Response) {
    const resExpressIndex = Reflect.getMetadata(MetadataKey.res, constructor.prototype, propertyKey);
    const bodyExpressIndex = Reflect.getMetadata(MetadataKey.body, constructor.prototype, propertyKey);
    const paramExpress= Reflect.getMetadata(MetadataKey.param, constructor.prototype, propertyKey);
    const queryExpress= Reflect.getMetadata(MetadataKey.query, constructor.prototype, propertyKey);
    
    const args = [];
    if (resExpressIndex !== undefined) {
        args[resExpressIndex] = res;
    }
    if (bodyExpressIndex !== undefined) {
        args[bodyExpressIndex] = req.body;
    }
    if (paramExpress?.length) {
        paramExpress.forEach((paramItem: ParamMetadata) => {
            args[paramItem.index] = req.params[paramItem.name];
        });
       
    }
    if (queryExpress?.length) {
        queryExpress.forEach((queryItem: ParamMetadata) => {
            args[queryItem.index] = req.params[queryItem.name];
        });
       
    }
    return args;
}
