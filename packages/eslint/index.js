/**
 * @type {import("eslint").ESLint.Options}
 */
const config = {
  
  root: true,
  extends: ["prettier", "eslint:recommended", "plugin:@typescript-eslint/recommended"],
  ignorePatterns: ["node_modules", "**/*/graphql/index.tsx", "**/*.less", "build", ".cache", "dist", "dev-dist"],
  plugins: ["unicorn", "@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  overrides: [
    {
      files: ["**/*.js"],
      env: { "commonjs": true, "shared-node-browser": true },
    },
    {
      files: ["**/*.ts"],
      plugins: ["node"],
      env: { commonjs: true, es6: true, node: true, browser: false },
      globals: {
        strapi: true,
        process: "readonly",
      },
    },
    {
      files: ["**/*.tsx"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:jsx-a11y/recommended",
        "plugin:react-hooks/recommended",
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: true,
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
        "react/jsx-curly-brace-presence": [
          "warn",
          { props: "always", children: "ignore", propElementValues: "always" },
        ],
        "react/jsx-no-target-blank": "warn",
        "react/prop-types": "off",
      },
      settings: {
        react: {
          version: "detect",
        },
        formComponents: [{ name: "Form", formAttribute: "action" }],
        linkComponents: [
          { name: "Link", linkAttribute: "to" },
          { name: "NavLink", linkAttribute: "to" },
          { name: "Typography.Link", linkAttribute: "href" },
        ],
      },
    },
    {
      files: ["**/*.d.ts"],
      rules: {
        "no-var": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/ban-types": "off",
      },
    },
    {
      files: ["**/*.graphql"],
      plugins: ["@graphql-eslint"],
      parser: "@graphql-eslint/eslint-plugin",
    },
  ],
}

module.exports = config
