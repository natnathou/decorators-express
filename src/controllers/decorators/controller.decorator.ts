import 'reflect-metadata';
import { AppRouter } from "../../router";
import { RoutesTypesKeys, MetadataKey } from "../constants";
import { Response, Request, NextFunction } from  'express';
import { ParamMetadata } from "./param.decorator";
import {BodyMetadata} from "./body.decorator";
import {QueryMetadata} from "./query.decorator";
import {RequestHandler} from "express-serve-static-core";
import {GuardFncType} from "./guard.decorator";

export type ArgumentOptions = Request | Response | NextFunction | {[key: string]: string} | string;

export function Controller(globalPath: string){
    return function <T extends { new(...args: any[]): {} }>(constructor: T)  {
      
        const prototypeKeys = Object.getOwnPropertyNames(constructor.prototype);

        for(let propertyKey of prototypeKeys) {
            
            const routeType: RoutesTypesKeys = Reflect.getMetadata(MetadataKey.routeType, constructor.prototype, propertyKey);
            let path: string = Reflect.getMetadata(MetadataKey.path, constructor.prototype, propertyKey);
            const globalMiddlewares: RequestHandler[] = Reflect.getMetadata(MetadataKey.middlewares, constructor.prototype, propertyKey) || [];
            const globalGuard: GuardFncType | undefined = Reflect.getMetadata(MetadataKey.guard, constructor.prototype, propertyKey);

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
                const middlewares: RequestHandler[] = Reflect.getMetadata(MetadataKey.middlewares, constructor.prototype, propertyKey) || [];
                const finalPath = `${globalPath}${path}`
                const router = AppRouter.getInstance();
                
                router[routeType](
                    finalPath,
                    ...globalMiddlewares,
                    ...middlewares,
                    function (req: Request, res: Response, next: NextFunction){
                        const guard: GuardFncType | undefined = Reflect.getMetadata(MetadataKey.guard, constructor.prototype, propertyKey);
                        if(globalGuard && !globalGuard(req, res)){
                            res.status(403)
                        } else if(guard && !guard(req, res)){
                            res.status(403)
                        } else{
                            next();
                        }
                    },
                    function (req: Request, res: Response, next: NextFunction){
                    const args: any[] = setArguments<T>(constructor, propertyKey, req, res, next);
                    (constructor.prototype[propertyKey] as Function).apply(constructor.prototype, args)
                })
            }

        }
};
}
function setArguments<T extends { new(...args: any[]): {}; }>(constructor: T, propertyKey: string, req: Request, res: Response, next: NextFunction) {
    const resMetadata: number = Reflect.getMetadata(MetadataKey.res, constructor.prototype, propertyKey);
    const reqMetadata: number = Reflect.getMetadata(MetadataKey.req, constructor.prototype, propertyKey);
    const nextMetadata: number = Reflect.getMetadata(MetadataKey.next, constructor.prototype, propertyKey);
    const bodyMetadata: BodyMetadata = Reflect.getMetadata(MetadataKey.body, constructor.prototype, propertyKey);
    const paramsMetadata: ParamMetadata[] = Reflect.getMetadata(MetadataKey.param, constructor.prototype, propertyKey);
    const queriesMetadata: QueryMetadata[] = Reflect.getMetadata(MetadataKey.query, constructor.prototype, propertyKey);

    const args: ArgumentOptions[] = [];
    if (resMetadata !== undefined) {
        args[resMetadata] = res;
    }
    if (reqMetadata !== undefined) {
        args[reqMetadata] = req;
    }
    if (resMetadata !== undefined) {
        args[nextMetadata] = next;
    }
    if (bodyMetadata !== undefined) {
        const { index, names} = bodyMetadata;
        let proprietiesToExtract: { [key: string]: string } | null = null;
        if(names?.length){
            proprietiesToExtract = {};
            for (let i = 0; i < names?.length; i++) {
                proprietiesToExtract[names[i]] =  req.body?.[names[i]]
            }
        }

        args[bodyMetadata.index] = proprietiesToExtract ? proprietiesToExtract : req.body;
    }
    if (paramsMetadata?.length) {
        paramsMetadata.forEach((paramItem: ParamMetadata) => {
            args[paramItem.index] = req.params?.[paramItem.name];
        });
       
    }
    if (queriesMetadata?.length) {
        queriesMetadata.forEach((queryItem: ParamMetadata) => {
            args[queryItem.index] = req.query?.[queryItem.name] as string;
        });
       
    }
    return args;
}
