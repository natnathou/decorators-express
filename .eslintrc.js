module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: ['./tsconfig(.*)?.json'],
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            typescript: { project: ['./tsconfig(.*)?.json'] },
        },
    },
    plugins: ['prettier', '@typescript-eslint/eslint-plugin', 'import'],
    extends: ['plugin:import/recommended', 'plugin:import/typescript', 'plugin:@typescript-eslint/recommended', 'airbnb-typescript/base'],
    root: true,
    env: {
        node: true,
        jest: true,
        es6: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": ["error", {"functions": false, "typedefs": false}],
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/ban-types': ['off', { types: { any: 'Do not use any' } }],
        '@typescript-eslint/no-explicit-any': ['off'],
        '@typescript-eslint/consistent-type-definitions': 'error',
        '@typescript-eslint/consistent-type-imports': 'warn',
        '@typescript-eslint/explicit-member-accessibility': ['off', { accessibility: 'explicit' }],
        '@typescript-eslint/lines-between-class-members': 'off',
        '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true }],
        '@typescript-eslint/no-unused-vars': 'warn',
        'brace-style': ['error', '1tbs', { allowSingleLine: true }],
        'class-methods-use-this': 'off',
        'id-match': 'off',
        'import/no-cycle': 'error',
        'import/no-extraneous-dependencies': ['error', { packageDir: './' }],
        'import/no-unresolved': 'off', // Typescript is checking it
        'import/order': [
            'error',
            {
                alphabetize: { caseInsensitive: true, order: 'asc' },
                groups: ['external', 'builtin', 'internal', 'parent', 'sibling'],
                'newlines-between': 'never',
            },
        ],
        'import/prefer-default-export': 'off',
        'max-len': ['warn', { code: 160 }],
        'no-console': 'warn',
        'no-nested-ternary': 'error',
        'no-param-reassign': 'warn',
        'no-underscore-dangle': 'warn',
        'object-curly-newline': [
            'error',
            {
                ObjectPattern: { multiline: true },
                ImportDeclaration: { multiline: true, minProperties: 7 },
                ExportDeclaration: { multiline: true, minProperties: 7 },
            },
        ],
        'padded-blocks': ['error', 'never', { allowSingleLineBlocks: true }],
        'prefer-destructuring': 'warn',
        'spaced-comment': ['error', 'always', { markers: ['#region', '#endregion'] }],
    },
    overrides: [
        {
            files: ['**/*spec.ts'],
            rules: {
                '@typescript-eslint/no-unused-vars': 'off'
            },
        },
    ],
};
