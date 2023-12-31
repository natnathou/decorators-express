import 'reflect-metadata';

import busboy from 'busboy';
import type { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { logger } from '../../services/logger.service';
import { MetadataKey } from '../constants';

export interface UploadMetadata { name: string, directory: string }
export function Upload({ name, directory }: UploadMetadata) {
  return function (prototype: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKey.files, { name, directory } as UploadMetadata, prototype, propertyKey);
  };
}

export function uploadMiddlewares(namePropriety?: string, directory?: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (namePropriety && directory) {
      const bb = busboy({ headers: req.headers });
      bb.on(namePropriety, (name, file, info) => {
        const { filename, encoding, mimeType } = info;
        logger.info(`[fileMiddlewares]: File [${info.filename}]: filename:${filename}, encoding: ${encoding}, mimeType: ${mimeType}`);
        const saveTo = directory;
        if (!fs.existsSync(saveTo)) {
          fs.mkdirSync(saveTo, { recursive: true });
        }
        const fullPath = path.join(saveTo,   `./${filename}`);
        const stream = fs.createWriteStream(fullPath);
        file.pipe(stream);
        file
          .on('data', (data: any) => {
            logger.info(`[fileMiddlewares]: File [${info.filename}] got ${data.length} bytes`);
          })
          .on('close', () => {
            logger.info(`[fileMiddlewares]: File [${info.filename}] done to get all bytes`);
          });

        stream.on('close', () => {
          logger.info(`[fileMiddlewares]: File [${info.filename}] done to write on the disk at path ${fullPath}`);
          next();
        });
        stream.on('error', (err: Error) => {
          logger.error(`[fileMiddlewares]: File [${info.filename}] error: ${err.message}`);
          res.status(500);
        });
      });
      bb.on('field', (name, val, info) => {
        logger.info(`[fileMiddlewares]: Field [${name}]: value: ${val}`);
      });
      bb.on('close', () => {
        logger.info('[fileMiddlewares]: Done parsing form!');
      });
      req.pipe(bb);
    } else {
      next();
    }
  };
}
