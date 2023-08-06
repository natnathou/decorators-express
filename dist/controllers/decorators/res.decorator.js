"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Res = void 0;
require("reflect-metadata");
const constants_1 = require("../constants");
function Res() {
    return function (prototype, propertyKey, parameterIndex) {
        Reflect.defineMetadata(constants_1.MetadataKey.res, parameterIndex, prototype, propertyKey);
    };
}
exports.Res = Res;
//# sourceMappingURL=res.decorator.js.map