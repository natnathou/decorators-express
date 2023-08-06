import 'reflect-metadata';
export interface ParamMetadata {
    index: number;
    name: string;
}
export declare function Param(name: string): (prototype: Object, propertyKey: string, parameterIndex: number) => void;
//# sourceMappingURL=param.decorator.d.ts.map