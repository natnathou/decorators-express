"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Body = void 0;
require("reflect-metadata");
const constants_1 = require("../constants");
function Body() {
    return function (prototype, propertyKey, parameterIndex) {
        Reflect.defineMetadata(constants_1.MetadataKey.body, parameterIndex, prototype, propertyKey);
    };
}
exports.Body = Body;
//# sourceMappingURL=body.decorator.js.map