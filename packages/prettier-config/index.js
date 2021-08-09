module.exports = {
  arrowParens: 'avoid',
  endOfLine: 'auto',
  jsxBracketSameLine: false,
  jsxSingleQuote: true,
  printWidth: 120,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  overrides: [
    {
      files: ['*.less'],
      options: {
        parser: 'less',
      },
    },
    {
      files: ['*.{yaml,yml}'],
      options: {
        parser: 'yaml',
      },
    },
    {
      files: ['*.graphql'],
      options: {
        parser: 'graphql',
      },
    },
    {
      files: ['*.vue'],
      options: {
        parser: 'vue',
      },
    },
    {
      files: ['*.jsonschema', '*rc', 'json'],
      options: {
        parser: 'json',
      },
    },
    {
      files: ['*.svg', '*.html', '*.ejs'],
      options: {
        parser: 'html',
      },
    },
  ],
}
