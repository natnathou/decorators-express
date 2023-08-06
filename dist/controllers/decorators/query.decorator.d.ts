import 'reflect-metadata';
import { ParamMetadata } from "./param.decorator";
export interface QueryMetadata extends ParamMetadata {
}
export declare function Query(name: string): (prototype: Object, propertyKey: string, parameterIndex: number) => void;
//# sourceMappingURL=query.decorator.d.ts.map