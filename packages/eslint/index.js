"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var importPluginSettings = {
    "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/ignore": [/\.coffee$/, /\.(scss|sass|less|css)$/],
    "import/resolver": {
        typescript: {
            alwaysTryTypes: true,
            project: true,
        },
        node: true,
    },
    "import/core-modules": ["strapi", "@bn-digital/strapi"],
    "import/internal-regex": "^@bn-digital/",
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
};
var reactSettings = {
    react: {
        version: "detect",
    },
    formComponents: [{ name: "Form", formAttribute: "action" }],
    linkComponents: [
        { name: "Link", linkAttribute: "to" },
        { name: "NavLink", linkAttribute: "to" },
        { name: "Typography.Link", linkAttribute: "href" },
    ],
};
var typescriptNamingConvention = [
    "warn",
    { selector: ["variableLike"], format: ["camelCase", "PascalCase"] },
    {
        selector: [
            "classProperty",
            "objectLiteralProperty",
            "typeProperty",
            "classMethod",
            "objectLiteralMethod",
            "typeMethod",
            "accessor",
            "enumMember",
        ],
        format: null,
        modifiers: ["requiresQuotes"],
    },
    {
        selector: "variable",
        modifiers: ["const"],
        format: ["UPPER_CASE", "camelCase", "PascalCase"],
    },
    { selector: ["typeLike"], format: ["PascalCase"] },
    {
        selector: "interface",
        format: ["PascalCase"],
        custom: {
            regex: "^I[A-Z]",
            match: false,
        },
    },
    {
        selector: "variable",
        types: ["boolean"],
        format: ["camelCase"],
        custom: { regex: "/(is|should|can|has|did|will)(.*)||(.*)(ing|ed)/", match: true },
    },
    {
        selector: "variable",
        modifiers: ["destructured"],
        format: null,
    },
    {
        selector: "parameter",
        format: ["camelCase", "PascalCase"],
        leadingUnderscore: "allow",
    },
    {
        selector: "memberLike",
        modifiers: ["private", "protected"],
        format: ["camelCase"],
        leadingUnderscore: "require",
    },
];
var typescriptParserOptions = {
    project: true,
};
var config = {
    root: true,
    extends: ["prettier", "eslint:recommended", "plugin:import/recommended"],
    ignorePatterns: [
        "**/*.css",
        "**/*.less",
        "**/*.sass",
        "**/*.scss",
        ".cache",
        "build",
        "dev-dist",
        "dist",
        "node_modules",
    ],
    plugins: ["unicorn"],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    overrides: [
        {
            files: ["*.js"],
            extends: ["plugin:node/recommended"],
            env: { "commonjs": true, "jest": true, "es6": true, "shared-node-browser": true, "node": true },
            plugins: ["node"],
            parser: "esprima",
            globals: {
                process: "readonly",
            },
        },
        {
            extends: ["plugin:@typescript-eslint/recommended", "plugin:import/typescript"],
            files: ["*.ts", "*.tsx", "*.d.ts"],
            parser: "@typescript-eslint/parser",
            plugins: ["node", "@typescript-eslint"],
            parserOptions: __assign({}, typescriptParserOptions),
            env: { "commonjs": true, "node": true, "shared-node-browser": true, "browser": false },
            globals: {
                strapi: true,
                process: "readonly",
            },
            rules: {
                "@typescript-eslint/explicit-member-accessibility": "warn",
                "@typescript-eslint/member-ordering": "warn",
                "@typescript-eslint/method-signature-style": "warn",
                "@typescript-eslint/naming-convention": typescriptNamingConvention,
                "@typescript-eslint/explicit-module-boundary-types": "warn",
            },
            settings: __assign({}, importPluginSettings),
            overrides: [
                {
                    files: ["*.d.ts"],
                    rules: {
                        "no-var": "off",
                        "@typescript-eslint/no-explicit-any": "off",
                        "@typescript-eslint/no-unused-vars": "off",
                        "@typescript-eslint/no-empty-interface": "off",
                        "@typescript-eslint/ban-types": "off",
                    },
                },
                {
                    files: ["*.tsx"],
                    extends: [
                        "plugin:@typescript-eslint/recommended",
                        "plugin:react/recommended",
                        "plugin:import/react",
                        "plugin:react/jsx-runtime",
                        "plugin:react-hooks/recommended",
                    ],
                    parserOptions: {
                        project: true,
                        ecmaFeatures: {
                            jsx: true,
                        },
                    },
                    globals: {
                        React: true,
                        process: "readonly",
                        browser: true,
                    },
                    env: {
                        "es6": true,
                        "serviceworker": true,
                        "shared-node-browser": true,
                        "browser": true,
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
                    settings: __assign(__assign({}, importPluginSettings), reactSettings),
                },
                {
                    files: ["**/*/src/graphql/index.ts", "**/*/src/graphql/index.tsx"],
                    rules: {
                        "@typescript-eslint/naming-convention": "off",
                        "@typescript-eslint/explicit-module-boundary-types": "off",
                    },
                },
            ],
        },
        {
            files: ["*.graphql"],
            plugins: ["@graphql-eslint"],
            parser: "@graphql-eslint/eslint-plugin",
            rules: {
                "@graphql-eslint/known-type-names": "error",
            },
        },
    ],
};
module.exports = config;
