module.exports = {
  extends: '@loopback/eslint-config',
  rules: {
    '@typescript-eslint/naming-convention': [
      'off',
      {
        selector: 'default',
        format: ['camelCase', 'PascalCase', 'snake_case'],
      },
    ],
  },
};
