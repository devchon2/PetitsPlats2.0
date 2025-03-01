module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['airbnb-base', 'prettier'],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'quotes': ['error', 'single'],
    'import/prefered-default-export' : 'off',
    'no-use-before-define': 'off',
    'no-nested-ternary': 'off',
    'import/extensions': [
      'error',
      'always', {
        'js': 'always',
        'mjs': 'never',
        'jsx': 'never'
      }
    ]
  }
}