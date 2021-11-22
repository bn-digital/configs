import { LoaderContext, RuleSetRule, RuleSetUseItem } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { Mode } from './config'
import fs from 'fs'
import path from 'path'

import { getHashDigest, interpolateName } from 'loader-utils'
type WebpackRule<T = RuleSetRule> = (override?: T, mode?: Mode) => T

const appDir = fs.realpathSync(process.cwd())

function getLocalIdent<T = any>(context: LoaderContext<T>, localIdentName: string, localName: string, options: T) {
  const toKebabCase = (string: string) =>
    string
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/\s+/g, '-')
      .toLowerCase()

  // Use the filename or folder name, based on some uses the index.js / index.module.(css|scss|sass) project style
  const fileNameOrFolder = context.resourcePath.match(/index\.module\.(css|less|scss|sass)$/) ? '[folder]' : '[name]'
  // Create a hash based on a the file location and class name. Will be unique across a project, and close to globally unique.
  const hash = getHashDigest(Buffer.from(path.posix.relative(context.rootContext, context.resourcePath) + localName), 'md5', 'base64', 5)

  // Use loaderUtils to find the file or folder name
  // Remove the .module that appears in every classname when based on the file and replace all "." with "_".
  const className = interpolateName(context, toKebabCase(fileNameOrFolder) + '-' + localName + '-' + String(hash).toLowerCase(), options)
  return toKebabCase(className.replace('.module', '').replace(/\./g, '-'))
}

const typescript: WebpackRule = (override = {}, mode = 'development') => ({
  test: /\.(js|ts)$/i,
  loader: require.resolve('babel-loader'),
  exclude: /node_modules/,
  options: {
    exclude: [/node_modules[\\/]core-js/, /node_modules[\\/]webpack[\\/]buildin/],
    cacheCompression: false,
    compact: mode === 'production',
    presets: [['@babel/preset-env'], ['@babel/preset-typescript']],
    plugins: [mode === 'development' && require.resolve('react-refresh/babel')].filter(Boolean),
  },
  ...override,
})

const react: WebpackRule = (override = {}, mode = 'development') => ({
  test: /\.(js|mjs|jsx|ts|tsx)$/,
  exclude: [/node_modules/, /sdk\/node_modules/],
  loader: require.resolve('babel-loader'),
  options: {
    exclude: [/node_modules[\\/]core-js/, /node_modules[\\/]webpack[\\/]buildin/],
    cacheDirectory: path.resolve(appDir, 'node_modules/.cache/babel'),
    cacheCompression: false,
    compact: mode === 'development',
    presets: [
      ['@babel/preset-env'],
      ['@babel/preset-typescript', { onlyRemoveTypeImports: true, allowNamespaces: true }],
      [
        '@babel/preset-react',
        {
          development: mode === 'development',
          runtime: 'automatic',
        },
      ],
    ],
  },
  ...override,
})

const ejs: WebpackRule = (override = {}): RuleSetRule => ({
  test: /\.(ejs)$/,
  loader: 'ejs-loader',
  exclude: /node-modules/,
  options: {
    variable: 'templateParameters',
  },
  ...override,
})

const styles: WebpackRule = (override = {}, mode = 'development') => ({
  test: /\.(css)$/,
  exclude: /\.module\.css$/,
  use: [
    {
      loader: mode === 'development' ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
    },
    {
      loader: require.resolve('css-loader'),
      options: {
        sourceMap: true,
        importLoaders: 3,
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        sourceMap: true,
        postcssOptions: {
          ident: 'postcss',
          plugins: [['postcss-preset-env'], ['postcss-normalize']],
          parser: require.resolve('postcss-less'),
        },
      },
    },
  ],
  ...override,
})

const cssModules: WebpackRule = (override = {}, mode = 'development') => ({
  test: /\.module\.css$/,
  use: [
    {
      loader: mode === 'development' ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
    },
    {
      loader: require.resolve('css-loader'),
      options: {
        sourceMap: true,
        importLoaders: 3,
        modules: {
          auto: true,
          mode: 'local',
          getLocalIdent,
          exportLocalsConvention: 'camelCase',
        },
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        sourceMap: true,
        postcssOptions: {
          ident: 'postcss',
          plugins: [['postcss-preset-env'], ['postcss-normalize']],
          parser: require.resolve('postcss-less'),
        },
      },
    },
  ],
  ...override,
})

const lessModules: WebpackRule = (override = {}, mode = 'development') =>
  cssModules(
    {
      test: /\.module\.less$/,
      use: (cssModules(override, mode).use as Array<RuleSetUseItem>).concat([
        {
          loader: require.resolve('resolve-url-loader'),
          options: { sourceMap: true, root: appDir },
        },
        {
          loader: require.resolve('less-loader'),
          options: {
            sourceMap: true,
            implementation: require.resolve('less'),
            lessOptions: {
              paths: [appDir, path.join(appDir, 'node_modules')],
              javascriptEnabled: true,
            },
          },
        },
      ]),
    },
    mode,
  )

const less: WebpackRule = (override = {}, mode = 'development') =>
  styles(
    {
      test: /\.(less)$/,
      exclude: /\.module\.less$/,
      use: (styles(override, mode).use as Array<RuleSetUseItem>).concat([
        {
          loader: require.resolve('resolve-url-loader'),
          options: { sourceMap: true, root: appDir },
        },
        {
          loader: require.resolve('less-loader'),
          options: {
            sourceMap: true,
            implementation: require.resolve('less'),
            lessOptions: {
              paths: [appDir, path.join(appDir, 'node_modules')],
              javascriptEnabled: true,
            },
          },
        },
      ]),
      ...override,
    },
    mode,
  )

const scss: WebpackRule = (override = {}, mode = 'development') =>
  styles(
    {
      test: /\.(scss|sass)$/,
      use: (styles({}, mode).use as Array<RuleSetUseItem>).concat([
        {
          loader: require.resolve('resolve-url-loader'),
          options: { sourceMap: true },
        },
        {
          loader: require.resolve('sass-loader'),
          options: {
            sourceMap: true,
            implementation: require.resolve('sass'),
          },
        },
      ]),
      ...override,
    },
    mode,
  )

const fonts: WebpackRule = (override = {}) => ({
  test: /\.(woff|woff2|otf|ttf|eot)$/,
  type: 'asset/resource',
  ...override,
})

const html: WebpackRule = (override = {}) => ({
  test: /\.html$/,
  loader: require.resolve('html-loader'),
  ...override,
})

const images: WebpackRule = (override = {}) => ({
  test: [/\.bmp$/, /\.gif$/, /\.webp$/, /\.jpe?g$/, /\.png$/],
  type: 'asset/resource',
  parser: {
    dataUrlCondition: {
      maxSize: 0,
    },
  },
  ...override,
})

const videos: WebpackRule = (override = {}) => ({
  test: /\.(mp4|mov|flv)$/,
  type: 'asset/resource',
  parser: {
    dataUrlCondition: {
      maxSize: 0,
    },
  },
  ...override,
})

const svg: WebpackRule = override => ({
  test: /\.svg$/,
  loader: require.resolve('url-loader'),
  type: 'javascript/auto',
  ...override,
})

const svgr: WebpackRule = (override, mode = 'development') => {
  const { loader, options } = react({}, mode)
  return {
    test: /\.svg$/,
    use: [
      { loader, options },
      {
        loader: require.resolve('@svgr/webpack'),
        options: { exportType: 'named', babel: false, svgo: false },
      },
      {
        loader: require.resolve('file-loader'),
      },
    ],
    type: 'javascript/auto',
    issuer: /\.(ts|js)?x/,
    ...override,
  }
}

const getRules = (mode: Mode = 'development') => ({
  ejs,
  fonts,
  images,
  less: (override: RuleSetRule = {}) => less(override, mode),
  lessModules: (override: RuleSetRule = {}) => lessModules(override, mode),
  react: (override: RuleSetRule = {}) => react(override, mode),
  scss,
  svg,
  svgr: (override: RuleSetRule = {}) => svgr(override, mode),
  typescript: (override: RuleSetRule = {}) => typescript(override, mode),
  videos,
})

const rules = getRules('development')

export type RulesConfiguration = Partial<{ [key in keyof typeof rules]: RuleSetRule }>

export { getRules }
