module.exports = {
  extends: ['plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'autofix'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/member-delimiter-style': [
      2,
      {
        multiline: {
          delimiter: 'none',
        },
      },
    ],
    '@typescript-eslint/interface-name-prefix': [2, { prefixWithI: 'always' }],
    '@typescript-eslint/no-explicit-any': [0],
    'autofix/no-console': 1,
    '@typescript-eslint/camelcase': 'off',
  },
}
