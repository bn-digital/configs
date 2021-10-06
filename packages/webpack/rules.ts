import { RuleSetRule, RuleSetUseItem } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import { Mode } from './config'
import fs from 'fs'

type WebpackRule<T = RuleSetRule> = (override?: T, mode?: Mode) => T

const appDir = fs.realpathSync(process.cwd())

const typescript: WebpackRule = (override = {}, mode = 'development') => ({
  test: /\.(js|ts)$/i,
  loader: 'babel-loader',
  exclude: /node_modules/,
  options: {
    exclude: [/node_modules[\\/]core-js/, /node_modules[\\/]webpack[\\/]buildin/],
    cacheDirectory: '.cache/babel',
    cacheCompression: false,
    compact: mode === 'production',
    presets: [['@babel/preset-env'], ['@babel/preset-typescript']],
  },
  ...override,
})

const react: WebpackRule = (override = {}, mode = 'development') => ({
  test: /\.(js|mjs|jsx|ts|tsx)$/,
  loader: require.resolve('babel-loader'),
  include: /src/,
  exclude: /node_modules/,
  options: {
    exclude: [/node_modules[\\/]core-js/, /node_modules[\\/]webpack[\\/]buildin/],
    cacheDirectory: '.cache/babel',
    cacheCompression: false,
    compact: mode === 'development',
    presets: [
      ['@babel/preset-env'],
      ['@babel/preset-typescript'],
      [
        '@babel/preset-react',
        {
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
const styles: WebpackRule = (override = {}) => ({
  test: /\.(css)$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: require.resolve('css-loader'),
      options: { importLoaders: 3 },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        postcssOptions: {
          ident: 'postcss',
          plugins: [['postcss-preset-env']],
          parser: require.resolve('postcss-less'),
        },
      },
    },
  ],
  ...override,
})

const less: WebpackRule = (override = {}) =>
  styles({
    test: /\.(css|less)$/,
    use: (styles(override).use as Array<RuleSetUseItem>).concat([
      {
        loader: require.resolve('resolve-url-loader'),
        options: {
          root: path.join(appDir, 'src'),
        },
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
  })

const scss: WebpackRule = (override = {}, mode = 'development') =>
  styles(
    {
      test: /\.(css|scss|sass)$/,
      use: (styles({}, mode).use as Array<RuleSetUseItem>).concat([
        {
          loader: require.resolve('resolve-url-loader'),
          options: {
            root: path.join(appDir, 'src'),
          },
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
  type: 'asset',
  parser: {
    dataUrlCondition: {
      maxSize: 0,
    },
  },
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
  ...override,
})

const svgUrl: WebpackRule = (override = {}) => ({
  test: /\.svg$/,
  loader: require.resolve('url-loader'),
  issuer: /\.(c|sc|le|sa)ss$/,
  ...override,
})

const videos: WebpackRule = (override = {}) => ({
  test: /\.(mp4|mov|flv)$/,
  type: 'asset/resource',
  ...override,
})

const svgComponent: WebpackRule = (override = {}) => ({
  test: /\.svg$/,
  type: 'asset',
  loader: require.resolve('@svgr/webpack'),
  ...override,
})

const fileLoaderFallback: WebpackRule = () => ({
  // Exclude `js` files to keep "css" loader working as it injects
  // its runtime that would otherwise be processed through "file" loader.
  // Also exclude `html` and `json` extensions so they get processed
  // by webpacks internal loaders.
  exclude: [/^$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
  type: 'asset/resource',
})

const getRules = (mode: Mode = 'development') => ({
  ejs,
  fonts,
  html,
  images,
  less,
  react: (override: RuleSetRule = {}) => react(override, mode),
  scss,
  styles,
  svgComponent: (override: RuleSetRule = {}) => svgComponent(override, mode),
  svgUrl: (override: RuleSetRule = {}) => svgUrl(override, mode),
  typescript: (override: RuleSetRule = {}) => typescript(override, mode),
  videos,
})

const rules = getRules('development')

export type RulesConfiguration = Partial<{ [key in keyof typeof rules]: RuleSetRule }>

export { getRules }
