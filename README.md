# BN Digital Coding Standards

## Packages

### Typescript

#### Usage

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

In your package.json file, add the following:

```json
{
  "prettier": "@bndigital/prettier-config"
}
```

### Vite

### GraphQL
