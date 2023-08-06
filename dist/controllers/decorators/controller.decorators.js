"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
require("reflect-metadata");
const router_1 = require("../../router");
const constants_1 = require("../constants");
function Controller(globalPath) {
    return function (constructor) {
        const prototypeKeys = Object.getOwnPropertyNames(constructor.prototype);
        for (let propertyKey of prototypeKeys) {
            const routeType = Reflect.getMetadata(constants_1.MetadataKey.routeType, constructor.prototype, propertyKey);
            let path = Reflect.getMetadata(constants_1.MetadataKey.path, constructor.prototype, propertyKey);
            if (path?.[0] !== '/') {
                path += '/';
            }
            if (globalPath?.[0] !== '/') {
                globalPath += '/';
            }
            if (globalPath?.[globalPath?.length - 1] === '/') {
                globalPath = globalPath.substring(0, globalPath.length - 1);
            }
            if (path && routeType) {
                let finalPath = `${globalPath}${path}`;
                const router = router_1.AppRouter.getInstance();
                router[routeType](finalPath, function (req, res) {
                    const args = setArguments(constructor, propertyKey, req, res);
                    constructor.prototype[propertyKey].apply(constructor.prototype, args);
                });
            }
        }
    };
}
exports.Controller = Controller;
function setArguments(constructor, propertyKey, req, res) {
    const resExpressIndex = Reflect.getMetadata(constants_1.MetadataKey.res, constructor.prototype, propertyKey);
    const bodyExpressIndex = Reflect.getMetadata(constants_1.MetadataKey.body, constructor.prototype, propertyKey);
    const paramExpress = Reflect.getMetadata(constants_1.MetadataKey.param, constructor.prototype, propertyKey);
    const queryExpress = Reflect.getMetadata(constants_1.MetadataKey.query, constructor.prototype, propertyKey);
    const args = [];
    if (resExpressIndex !== undefined) {
        args[resExpressIndex] = res;
    }
    if (bodyExpressIndex !== undefined) {
        args[bodyExpressIndex] = req.body;
    }
    if (paramExpress?.length) {
        paramExpress.forEach((paramItem) => {
            args[paramItem.index] = req.params[paramItem.name];
        });
    }
    if (queryExpress?.length) {
        queryExpress.forEach((queryItem) => {
            args[queryItem.index] = req.params[queryItem.name];
        });
    }
    return args;
}
//# sourceMappingURL=controller.decorators.js.map