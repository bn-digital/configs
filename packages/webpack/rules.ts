import { RuleSetRule } from 'webpack'
import autoprefixer from 'autoprefixer'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export const babel: RuleSetRule = {
  test: /\.(js|ts)x?$/i,
  loader: 'babel-loader',
  exclude: /node_modules/,
  options: {
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
      options: {
        importLoaders: 3,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [autoprefixer],
        },
      },
    },
    {
      loader: 'less-loader',
      options: {
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

export const images: RuleSetRule = {
  test: /\.(png|webp|bmp|jpg|jpeg|gif)$/i,
  type: 'asset',
}

export const svg: RuleSetRule = {
  test: /\.svg$/,
  use: [{ loader: 'svgo-loader' }, { loader: '@svgr/webpack' }],
}
