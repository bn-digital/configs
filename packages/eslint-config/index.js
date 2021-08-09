module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    worker: true,
  },
  globals: {
    process: 'readonly',
  },
  plugins: ['@typescript-eslint', 'dirnames', 'import', 'react', 'react-hooks', 'unicorn'],
  rules: {
    'dirnames/match-kebab-case': 'warn',
  },
  overrides: [
    {
      files: '**/*/graphql/*.tsx',
      rules: {
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-extra-semi': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
    {
      files: ['**/*.{tsx,less}'],
      rules: {
        'unicorn/filename-case': [
          'warn',
          {
            case: 'pascalCase',
          },
        ],
      },
    },
    {
      files: ['**/*.ts'],
      rules: {
        'unicorn/filename-case': [
          'warn',
          {
            cases: {
              kebabCase: true,
              camelCase: true,
            },
          },
        ],
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
}
