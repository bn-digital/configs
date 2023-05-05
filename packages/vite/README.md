# Vite

## React configuration

### Dependencies

Add required dependencies and scripts in `package.json` and install them:

```json
{
  "scripts": {
    "vite": "node_modules/.bin/vite",
    "build": "yarn vite build",
    "dev": "yarn vite serve",
    "start": "yarn vite preview"
  },
  "devDependencies": {
    "@bn-digital/vite": "^2.2.22"
  }
}
```

### Configuration

#### tsconfig.json

```json
{
  "extends": "@bn-digital/typescript-config/react.json",
  "compilerOptions": {
    "baseUrl": ".",
    "outDir": "build"
  },
  "include": [
    "src"
  ]
}
```

#### vite.config.ts

Vite is responsible for bundling and serving the application. It is configured in your website's working
directory `vite.config.ts` file with initial project configuration like this:

```ts
import {configureReact} from "@bn-digital/vite"

export default configureReact(
  {},
  {
    react: {svg: {enabled: true}},
    buildInfo: {enabled: false},
    lint: {enabled: true, enableBuild: false},
    graphql: {enabled: true},
    analytics: {
      enableDev: true,
      gtm: process.env.APP_ENV === "staging" || !process.env.APP_ENV ? {id: "GTM-XXXX"} : undefined,
    },
    fonts: {
      google: {
        preconnect: true,
        families: [{name: "Lato", styles: "wght@400;500;600;700;800;900"}],
        display: "auto",
      },
    },
  }
)
```

Keep in mind Vite is responsible for next list of features, including them into bundle properly:

- linting / formatting
- graphql code and types generation
- fonts management and injection
- PWA, web manifest, icons etc.
- svg icons inline injection
- minification
- analytics and tracking scripts injection from various providers
