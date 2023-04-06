/**
 * @type {import('eslint').ESLint.Options}
 */
const config = {
  "extends": ["@bn-digital/eslint-config/typescript"],
  "plugins": ["node"],
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": false
    }
  },
  "env": {"commonjs": true, "es6": true, "node": true, "browser": false},
  "globals": {
    "strapi": true,
    "process": "readonly"
  }
}
module.exports = config
