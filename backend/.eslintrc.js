module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['prettier', '@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/semi': ['warn', 'never'],
    '@typescript-eslint/object-curly-spacing': ['warn', 'always'],
    '@typescript-eslint/space-before-blocks': ['warn', 'always'],
    '@typescript-eslint/quotes': ['warn', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
    '@typescript-eslint/comma-dangle': ['warn', 'always-multiline'],
    '@typescript-eslint/comma-spacing': ['warn', { 'before': false, 'after': true }],
    '@typescript-eslint/key-spacing': ['warn', { 'afterColon': true }],
  },
};
