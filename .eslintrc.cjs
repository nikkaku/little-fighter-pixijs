/* eslint-env node */
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: ['eslint:recommended'],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    'no-var': 'error',
    'prefer-const': 'error'
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  }
}
