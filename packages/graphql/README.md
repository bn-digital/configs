# GraphQL Codegen

## Installation

Add dependencies to `package.json` following configuration options.

> In case of workspaces, add snippet to project root file. Examples provided considering default @bn-digital project structure and Strapi connected.

```json
{
  "devDependencies": {
    "@graphql-codegen/cli": "^2.2.0",
    "@bn-digital/graphql-codegen": "^1.0.0"
  },
  "scripts": {
    "graphql": "graphql-codegen --watch"
  }
}
```

## Configure

### Jetbrains IDE support

1. Make sure you have installed [GraphQL] plugin.
2. Check that file `.graphqlconfig` exists in project root with similar content (change `%app-name%` at least):

```json
{
  "name": "BN Digital",
  "schemaPath": "./packages/cms/exports/graphql/schema.graphql",
  "includes": [
    "packages/*/exports/graphql/*/*.graphql",
    "packages/*/api/*/config/graphql.schema.js",
    "packages/*/extensions/*/config/graphql.schema.js",
    "packages/*/src/graphql/*/*.graphql"
  ],
  "extensions": {
    "endpoints": {
      "development": {
        "url": "http://localhost:1337/graphql"
      },
      "staging": {
        "url": "https://%application%.bndigital.dev/graphql"
      }
    }
  }
}
```

3. Check that file `codegen.yaml` exists in project root with similar content (change `%app-name%` at least):

```yaml
schema: packages/cms/exports/graphql/schema.graphql
documents:
  - packages/cms/exports/graphql/fragments/*.graphql
hooks:
  afterAllFileWrite:
    - eslint --fix --quiet
    - prettier --write
config:
  avoidOptionals: true
  dedupeFragments: true
  noExport: false
  preResolveTypes: true
  strictScalars: true
  withComponent: true
  withHooks: true
  withResultType: true
  scalars:
    Upload: unknown
    Date: Date
    Time: Date
    JSON: Record<string, any>
    Long: number
    DateTime: Date
generates:
  packages/website/src/graphql/index.tsx:
    documents:
      - packages/website/src/graphql/**/*.graphql
    plugins:
      - typescript
      - typescript-operations
      - typescript-react-apollo
```

4. Extend types in your `packages/website/tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["src/graphql"]
  }
}
```

## Usage

Use following command for continuous types generation. It will generate required scripts and watch for used `*.graphql` file changes, so types will be automatically updated.

> IDE types resolution and availability could be bit delayed in terms of change detection or typescript recompile.

```shell
yarn graphql
```
