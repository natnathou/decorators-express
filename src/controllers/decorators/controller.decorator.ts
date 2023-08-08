import 'reflect-metadata';

import type { NextFunction, Request, Response } from  'express';
import type { RequestHandler } from 'express-serve-static-core';
import { AppRouter } from '../../router';
import { logger } from '../../services/logger.service';
import type { RoutesTypesKeys } from '../constants';
import { MetadataKey } from '../constants';
import type { BodyMetadata } from './body.decorator';
import type { GuardFncType } from './guard.decorator';
import type { ParamMetadata } from './param.decorator';
import type { QueryMetadata } from './query.decorator';

export type ArgumentOptions = Request | Response | NextFunction | { [key: string]: string } | string;
export function Controller(globalPathParam: string) {
  let globalPath = globalPathParam;
  return function <T extends { new(...args: any[]): {} }>(constructor: T)  {
    const prototypeKeys = Object.getOwnPropertyNames(constructor.prototype).filter(p=>p !== 'constructor');

    logger.info(`[${constructor.name}] controller has been instanced`);
    for (const propertyKey of prototypeKeys) {
      const routeType: RoutesTypesKeys = Reflect.getMetadata(MetadataKey.routeType, constructor.prototype, propertyKey);
      let path: string = Reflect.getMetadata(MetadataKey.path, constructor.prototype, propertyKey);
      const globalMiddlewares: RequestHandler[] = Reflect.getMetadata(MetadataKey.middlewares, constructor.prototype, propertyKey) || [];
      const globalGuard: GuardFncType | undefined = Reflect.getMetadata(MetadataKey.guard, constructor.prototype, propertyKey);

      if (path?.[0] !== '/') {
        path = '/' + path;
      }

      if (path?.length  && path?.[path?.length - 1] === '/') {
        path = path.substring(0, path.length - 1);
      }
      if (globalPath?.[0] !== '/') {
        globalPath = '/' + globalPath;
      }
      if (globalPath?.[globalPath?.length - 1] === '/') {
        globalPath = globalPath.substring(0, globalPath.length - 1);
      }
      const finalPath = `${globalPath}${path}`;

      if (finalPath && routeType) {
        const middlewares: RequestHandler[] = Reflect.getMetadata(MetadataKey.middlewares, constructor.prototype, propertyKey) || [];
        const router = AppRouter.getInstance();
        logger.info(`[${constructor.name}] route ${routeType.toUpperCase()} | path ${finalPath} has been registered`);

        router[routeType](
          finalPath,
          ...globalMiddlewares,
          ...middlewares,
          function (req: Request, res: Response, next: NextFunction) {
            const guard: GuardFncType | undefined = Reflect.getMetadata(MetadataKey.guard, constructor.prototype, propertyKey);
            if (globalGuard && !globalGuard(req, res)) {
              res.status(403);
            } else if (guard && !guard(req, res)) {
              res.status(403);
            } else {
              next();
            }
          },
          function (req: Request, res: Response, next: NextFunction) {
            const args: any[] = setArguments<T>(constructor, propertyKey, req, res, next);
            (constructor.prototype[propertyKey] as Function).apply(constructor.prototype, args);
          });
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
    const { names } = bodyMetadata;
    let proprietiesToExtract: { [key: string]: string } | null = null;
    if (names?.length) {
      proprietiesToExtract = {};
      for (let i = 0; i < names?.length; i++) {
        proprietiesToExtract[names[i]] =  req.body?.[names[i]];
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
