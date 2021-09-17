import { RuleSetRule } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import autoprefixer from 'autoprefixer'
export const babel: RuleSetRule = {
  test: /\.(js|ts)x?$/i,
  loader: 'babel-loader',
  exclude: /node_modules/,
  options: {
    exclude: [/node_modules[\\/]core-js/, /node_modules[\\/]webpack[\\/]buildin/],
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
  test: /\.((c|sa|sc|le)ss)$/i,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: require.resolve('css-loader'),
      options: { sourceMap: true },
    },
    {
      loader: require.resolve('less-loader'),
      options: {
        sourceMap: true,
        implementation: require.resolve('less'),
        lessOptions: {
          paths: [path.join(process.cwd()), path.join(process.cwd(), 'node_modules')],
          javascriptEnabled: true,
        },
      },
    },
  ],
}

export const lessPostCss: RuleSetRule = {
  test: /\.((c|sa|sc|le)ss)$/i,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: require.resolve('css-loader'),
      options: { sourceMap: true, importLoaders: 2 },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        sourceMap: true,
        implementation: require.resolve('postcss'),
        postcssOptions: {
          plugins: [autoprefixer],
        },
      },
    },
    {
      loader: require.resolve('less-loader'),
      options: {
        sourceMap: true,
        implementation: require.resolve('less'),
        lessOptions: {
          paths: [path.join(process.cwd()), path.join(process.cwd(), 'node_modules')],
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
  loader: 'url-loader',
}

export const svgInComponents: RuleSetRule = {
  test: /\.svg$/i,
  issuer: /\.(js|ts)x?$/,
  use: [
    {
      loader: '@svgr/webpack',
      options: {
        babel: false,
      },
    },
    {
      loader: 'url-loader',
    },
  ],
}
