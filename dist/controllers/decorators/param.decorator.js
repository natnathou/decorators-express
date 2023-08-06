"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Param = void 0;
require("reflect-metadata");
const constants_1 = require("../constants");
function Param(name) {
    return function (prototype, propertyKey, parameterIndex) {
        const paramMetadata = Reflect.getMetadata(constants_1.MetadataKey.param, prototype, propertyKey) || [];
        Reflect.defineMetadata(constants_1.MetadataKey.param, [...paramMetadata, { index: parameterIndex, name }], prototype, propertyKey);
    };
}
exports.Param = Param;
//# sourceMappingURL=param.decorator.js.map