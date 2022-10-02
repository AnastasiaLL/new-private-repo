module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'airbnb-base'],
  parserOptions: {
    ecmaVersion: 14,
    sourceType: 'module',
  },
  rules: {
    'no-use-before-define': 'off',
    'no-console': 'off',
    'no-alert': 'off',
  },
};
