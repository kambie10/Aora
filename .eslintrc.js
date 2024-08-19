// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 100,
        tabWidth: 2,
        useTabs: false,
        semi: false,
        trailingComma: 'all',
        bracketSpacing: true,
        bracketSameLine: false,
        jsxBracketSameLine: false,
        singleAttributePerLine: true,
        arrowParens: 'always',
      },
    ],
  },
}
