"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
require("reflect-metadata");
const constants_1 = require("../constants");
function Query(name) {
    return function (prototype, propertyKey, parameterIndex) {
        const queryMetadata = Reflect.getMetadata(constants_1.MetadataKey.query, prototype, propertyKey) || [];
        Reflect.defineMetadata(constants_1.MetadataKey.query, [...queryMetadata, { index: parameterIndex, name }], prototype, propertyKey);
    };
}
exports.Query = Query;
//# sourceMappingURL=query.decorator.js.map