## BN Digital: ESLint config

### Presets

```
. @bn-digital/eslint-config
  . @bn-digital/eslint-config/typescript
    . @bn-digital/eslint-config/react
    . @bn-digital/eslint-config/strapi
```

## Usage

Add to your `package.json`

```json
{
  "devDependencies": {
    "@bn-digital/eslint-config": "*"
  },
  "eslintConfig": {
    "extends": "@bn-digital/eslint-config/react"
  }
}
```
