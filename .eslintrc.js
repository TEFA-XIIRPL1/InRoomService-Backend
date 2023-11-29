module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier', 'eslint-config-prettier'],
  parserOptions: {
    ecmaVersion: 15,
  },
  rules: {
    'no-console': 'off',
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: { consistent: true, multiline: true },
        ObjectPattern: { consistent: true, multiline: true },
        ImportDeclaration: 'never',
        ExportDeclaration: { multiline: true, minProperties: 3 },
      },
    ],
    'operator-linebreak': ['error', 'before'],
  },
};
