"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Head = exports.Options = exports.Delete = exports.Put = exports.Patch = exports.Post = exports.Get = void 0;
require("reflect-metadata");
const constants_1 = require("../constants");
function route(routeType) {
    return function (path) {
        return function (prototype, propertyKey, descriptor) {
            Reflect.defineMetadata(constants_1.MetadataKey.path, path, prototype, propertyKey);
            Reflect.defineMetadata(constants_1.MetadataKey.routeType, routeType, prototype, propertyKey);
        };
    };
}
exports.Get = route(constants_1.RoutesTypesKeys.get);
exports.Post = route(constants_1.RoutesTypesKeys.post);
exports.Patch = route(constants_1.RoutesTypesKeys.post);
exports.Put = route(constants_1.RoutesTypesKeys.put);
exports.Delete = route(constants_1.RoutesTypesKeys.delete);
exports.Options = route(constants_1.RoutesTypesKeys.options);
exports.Head = route(constants_1.RoutesTypesKeys.head);
//# sourceMappingURL=route.decorator.js.map