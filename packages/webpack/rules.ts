import { RuleSetRule } from 'webpack'
import autoprefixer from 'autoprefixer'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export const babel: RuleSetRule = {
  test: /\.(js|ts)x?$/i,
  loader: 'babel-loader',
  exclude: /node_modules/,
  options: {
    cacheDirectory: true,
    cacheCompression: false,
    compact: process.env.NODE_ENV === 'production',
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
}

export const ejs: RuleSetRule = {
  test: /\.(ejs)$/i,
  loader: 'ejs-loader',
  exclude: /node-modules/,
  options: {
    variable: 'templateParameters',
  },
}

export const less: RuleSetRule = {
  test: /\.(css|less)$/i,
  exclude: /\.module\.(css|less)$/i,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: 'css-loader',
      options: { sourceMap: true },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        implementation: require.resolve('postcss'),
        postcssOptions: {
          plugins: [autoprefixer],
        },
      },
    },
    {
      loader: 'less-loader',
      options: {
        sourceMap: true,
        implementation: require.resolve('less'),
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  ],
}

export const fonts: RuleSetRule = {
  test: /\.(woff|woff2|eot|ttf|otf)$/i,
  type: 'asset/resource',
}

export const htmlLoader: RuleSetRule = {
  test: /\.html$/i,
  loader: 'html-loader',
  options: {
    minimize: true,
  },
}

export const images: RuleSetRule = {
  test: /\.(png|webp|bmp|jpg|jpeg|gif)$/i,
  type: 'asset',
}

export const svgInStyles: RuleSetRule = {
  test: /\.svg$/i,
  type: 'asset/resource',
  parser: { maxSize: 0 },
  issuer: /\.(css|less|scss)$/,
}

export const svgInComponents = {
  test: /\.svg$/i,
  use: [{ loader: '@svgr/webpack', options: { prettier: false } }],
  issuer: /\.(jsx|tsx)$/,
}
