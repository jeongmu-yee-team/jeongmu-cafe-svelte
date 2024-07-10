/** @type { import("eslint").Linter.Config } */
module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:svelte/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'eslint-plugin-svelte'],
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
    'object-curly-newline': 'warn',
    'dot-notation': 'off',
    'max-len': [
      'warn',
      {
        code: 150,
        ignoreComments: true,
      },
    ],
    'no-trailing-spaces': 'error',
    'no-underscore-dangle': 'off',
    'svelte/no-dupe-on-directives': 'error',
    'svelte/no-dupe-use-directives': 'error',
    'svelte/no-reactive-literals': 'error',
    'svelte/no-reactive-functions': 'error',
    'svelte/no-extra-reactive-curlies': 'warn',
    'svelte/sort-attributes': [
      'warn',
      {
        order: [
          'this',
          'bind:this',
          'id',
          'name',
          'slot',
          { match: '/^--/u', sort: 'alphabetical' },
          ['style', '/^style:/u'],
          'class',
          { match: '/^class:/u', sort: 'alphabetical' },
          {
            match: ['!/:/u', '!/^(?:this|id|name|style|class)$/u', '!/^--/u'],
            sort: 'alphabetical',
          },
          ['/^bind:/u', '!bind:this', '/^on:/u'],
          { match: '/^use:/u', sort: 'alphabetical' },
          { match: '/^transition:/u', sort: 'alphabetical' },
          { match: '/^in:/u', sort: 'alphabetical' },
          { match: '/^out:/u', sort: 'alphabetical' },
          { match: '/^animate:/u', sort: 'alphabetical' },
          { match: '/^let:/u', sort: 'alphabetical' },
        ],
      },
    ],
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', ['parent', 'sibling'], 'index', 'object', 'type'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
  },
};
