const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
    {
        files: ['**/*.ts'],
        ignores: ['**/node_modules/**', 'dist/**', 'examples/**']
    },
    {
        languageOptions: {
            sourceType: 'module',
            ecmaVersion: 'latest',
            parser: tseslint.parser,
            parserOptions: {
                ecmaFeatures: {
                    impliedStrict: true
                }
            },
            globals: {
                // Node.js global
                process: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                exports: 'writable',
                module: 'readonly',
                require: 'readonly'
            }
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin
        },
        rules: {
            'semi': ['error', 'always'],
            'no-return-await': 'off',
            'space-before-function-paren': [
                'error',
                {
                    'named': 'never',
                    'anonymous': 'never',
                    'asyncArrow': 'always'
                }
            ],
            'quotes': [
                'error',
                'single',
                {
                    'allowTemplateLiterals': true
                }
            ],
            'template-curly-spacing': [
                'error',
                'always'
            ],
            'indent': [
                'error',
                4
            ],
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-use-before-define': [
                'error',
                {
                    'functions': false,
                    'classes': true
                }
            ]
        }
    }
);