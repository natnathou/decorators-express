import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';
const { compilerOptions } = require('./tsconfig');

// Sync object
const config: Config.InitialOptions = {
    rootDir: '.',
    testEnvironment: 'node',
    verbose: true,
    coverageDirectory: 'reports/coverage',
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts',
    ],
    collectCoverage: true,
    coverageReporters: ['lcov', 'html', 'cobertura', 'text'],
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    testTimeout: 30000,
    reporters: [
        'default',
        [
            'jest-junit', {
                outputDirectory: 'reports/unitTest',
                outputName: 'junit.xml',
            },
        ]],
    moduleFileExtensions: ['js', 'json', 'ts'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' })
};

export default config;
