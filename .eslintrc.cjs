/** @type { import("eslint").Linter.Config } */
module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:svelte/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    extraFileExtensions: ['.svelte'],
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      rules: {
        'no-console': 'error',
      },
    },
  ],
  rules: {
    camelcase: 'off',
    semi: ['error', 'always'],
    'no-extra-semi': 'error',
    'no-console': 'error',
    'no-alert': 'off',
    'no-multi-spaces': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'no-mixed-spaces-and-tabs': 'error',
    'linebreak-style': 'off',
    'object-curly-newline': 0,
    'dot-notation': 'off',
    'max-len': [
      'warn',
      {
        code: 120,
        ignoreComments: true,
      },
    ],
    'no-trailing-spaces': 'error',
    'no-underscore-dangle': 'off',
  },
};
