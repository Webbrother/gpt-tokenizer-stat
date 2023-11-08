module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:prettier/recommended'],
  overrides: [],
  plugins: ['import', 'simple-import-sort'],

  parserOptions: {
    sourceType: 'module',
  },
};
