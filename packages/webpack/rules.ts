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
    plugins: [mode === 'development' && require.resolve('react-refresh/babel')].filter(Boolean),
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
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        esModule: false,
      },
    },
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

const svgComponent: WebpackRule = override => ({
  test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
  issuer: /\.[jt]sx?$/,
  use: [require.resolve('babel-loader'), require.resolve('@svgr/webpack'), require.resolve('url-loader')],
  ...override,
})

const svgSrc: WebpackRule = override => ({
  test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
  loader: require.resolve('url-loader'),
  ...override,
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
  svgSrc,
  svgComponent,
  typescript: (override: RuleSetRule = {}) => typescript(override, mode),
  videos,
})

const rules = getRules('development')

export type RulesConfiguration = Partial<{ [key in keyof typeof rules]: RuleSetRule }>

export { getRules }
