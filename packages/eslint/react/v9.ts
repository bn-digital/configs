const globals = require("globals")
const reactRecommended = require("eslint-plugin-react/configs/recommended")
const reactJsx = require("eslint-plugin-react/configs/jsx-runtime")
import { configs } from "eslint-plugin-react-hooks"

/**
 * @type {import('eslint').ESLint.Options}
 */
const config = {
  plugins: { react: reactRecommended, ["react-jsx"]: reactJsx, ["react-hooks"]: configs.recommended },
  extends: [
    "@bn-digital/eslint-config/typescript",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["**/graphql/index.tsx", "**/types/graphql.d.ts"],
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    globals: {
      ...globals.browser,
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    "shared-node-browser": true,
    "es6": true,
    "browser": true,
    "serviceworker": true,
    "worker": true,
  },
  globals: {
    browser: "readonly",
  },
  rules: {
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react/display-name": "off",
    "react/jsx-fragments": ["warn", "element"],
    "react/jsx-curly-brace-presence": ["warn", { props: "always", children: "ignore", propElementValues: "always" }],
    "react/jsx-no-target-blank": "warn",
    "react/prop-types": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
    formComponents: ["CustomForm", { name: "Form", formAttribute: "action" }],
    linkComponents: [
      { name: "Link", linkAttribute: "to" },
      { name: "NavLink", linkAttribute: "to" },
      {
        name: "Typography.Link",
        linkAttribute: "href",
      },
    ],
  },
}

module.exports = config
