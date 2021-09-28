## BN Digital: ESLint config

### Presets

#### Language

- `@bn-digital/eslint-config/graphql`
- `@bn-digital/eslint-config/typescript`
- `@bn-digital/eslint-config/javascript`

#### Framework

- `@bn-digital/eslint-config/react`
- `@bn-digital/eslint-config/strapi`

## Usage 

Add to your `package.json`

```json
{
  "devDependencies": {
    "@bn-digital/eslint-config": "latest"
  },
  "eslintConfig": {
    "extends": [
      "@bn-digital/eslint-config/react",
      "@bn-digital/eslint-config/graphql"
    ]
  }
}
```
