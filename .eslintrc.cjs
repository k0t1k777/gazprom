module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslintrecommended',
    'plugin@typescript-eslintrecommended',
    'plugin@typescript-eslintrecommended-requiring-type-checking',
    'pluginreact-hooksrecommended',
    'airbnb-typescript',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
