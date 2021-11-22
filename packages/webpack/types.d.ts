/// <reference types="node" />
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="react" />
/// <reference types="webpack/types" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'staging' | 'test'
    readonly PUBLIC_URL: string
  }
}

declare namespace Webpack {
  import type { RulesConfiguration } from './rules'
  import type { PluginConfiguration } from './plugins'

  type Mode = 'production' | 'development' | string

  type CliArgs = {
    mode: Webpack.Mode
  }
  type Overrides = {
    rules: RulesConfiguration
    plugins: Partial<PluginConfiguration>
  }
}

declare namespace Package {
  type Metadata = {
    name: string
    proxy?: string
    homepage?: string
  }
}

declare module '*.mp4' {
  const src: string
  export default src
}

declare module '*.flv' {
  const src: string
  export default src
}

declare module '*.mov' {
  const src: string
  export default src
}

declare module '*.bmp' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

declare module '*.svg' {
  import * as React from '@types/react'

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>

  const src: string
  export default src
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.less' {
  const classes: { readonly [key: string]: string }
  export default classes
}
