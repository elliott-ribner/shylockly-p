module.exports = {
  extends: ['plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'autofix'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1,
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
    '@typescript-eslint/camelcase': ['error', { allow: ['reason_code'] }],
  },
}
