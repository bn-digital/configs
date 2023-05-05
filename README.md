<center>

# BN Digital Coding Standards

![npm](https://img.shields.io/npm/v/@bn-digital/cosmiconfig?style=flat-square&label=cosmiconfig) ![npm](https://img.shields.io/npm/v/@bn-digital/eslint-config?style=flat-square&label=eslint) ![npm](https://img.shields.io/npm/v/@bn-digital/prettier-config?style=flat-square&label=prettier) ![npm](https://img.shields.io/npm/v/@bn-digital/stylelint-config?style=flat-square&label=stylelint) ![npm](https://img.shields.io/npm/v/@bn-digital/graphql-config?style=flat-square&label=graphql) ![npm](https://img.shields.io/npm/v/@bn-digital/vite?style=flat-square&label=vite) ![npm](https://img.shields.io/npm/v/@bn-digital/commitlint-config?style=flat-square&label=commitlint)

</center>

---

## Packages

This package is a meta package that bundles other packages all together. To install, add the following to your `package.json` file:

```json
{
  "devDependencies": {
    "@bndigital/cosmiconfig": "^1.0.8"
  }
}
```

and configure corresponding tools as described below.

### Typescript

![npm](https://img.shields.io/npm/v/@bn-digital/typescript-config?style=flat-square)

In your `tsconfig.json` file, add the following:

```json
{
  "extends": "@bndigital/typescript/standard"
}
```

Available profiles to use:

- `@bndigital/typescript/standard`
- `@bndigital/typescript/react`
- `@bndigital/typescript/strapi-admin`
- `@bndigital/typescript/strapi-server`
- `@bndigital/typescript/pulumi`
- `@bndigital/typescript/projen`

### ESLint

![npm](https://img.shields.io/npm/v/@bn-digital/eslint-config?style=flat-square)

In your package.json file, add the following:

```json
{
  "eslintConfig": {
    "extends": "@bndigital/eslint-config"
  }
}
```

### Stylelint

In your package.json file, add the following:

```json
{
  "stylelint": {
    "extends": "@bndigital/stylelint-config"
  }
}
```

### Prettier

![npm](https://img.shields.io/npm/v/@bn-digital/prettier-config?style=flat-square)

In your package.json file, add the following:

```json
{
  "prettier": "@bndigital/prettier-config"
}
```

### Vite

![npm](https://img.shields.io/npm/v/@bn-digital/vite?style=flat-square)

See [vite](packages/vite/README.md) for more information.

### GraphQL

![npm](https://img.shields.io/npm/v/@bn-digital/graphql-config?style=flat-square)

See [graphql](packages/graphql/README.md) for more information.
