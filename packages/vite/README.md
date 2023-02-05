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
  "include": ["src"]
}
```

#### vite.config.ts

```ts
import { configureReact } from '@bn-digital/vite';
import { defineConfig } from 'vite';

const reactConfig = configureReact();

export default defineConfig({...reactConfig});
```

```
