/**
 * @type {ESLint.Options}
 */
const config = {
  extends: [
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["**/graphql/index.tsx"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    browser: "readonly",
  },
  env: {
    es6: true,
    serviceworker: true,
    browser: true,
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
  overrides: [
    {
      files: ["**/*.graphql"],
      extends: ["plugin:@graphql-eslint/operations-recommended"],
      plugins: ["@graphql-eslint"],
      parser: "@graphql-eslint/eslint-plugin",
      rules: {
        "@graphql-eslint/require-id-when-available": "warn",
      },
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
    formComponents: [{ name: "Form", formAttribute: "action" }],
    linkComponents: [
      { name: "Link", linkAttribute: "to" },
      {
        name: "NavLink",
        linkAttribute: "to",
      },
      { name: "Typography.Link", linkAttribute: "href" },
    ],
  },
}

module.exports = config
