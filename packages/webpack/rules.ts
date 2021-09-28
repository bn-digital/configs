import { RuleSetRule, RuleSetUseItem } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'

export const typescript: RuleSetRule = {
  test: /\.(js|ts)$/i,
  loader: 'babel-loader',
  exclude: /node_modules/,
  options: {
    exclude: [/node_modules[\\/]core-js/, /node_modules[\\/]webpack[\\/]buildin/],
    cacheDirectory: true,
    cacheCompression: false,
    compact: process.env.NODE_ENV === 'production',
    presets: [['@babel/preset-env'], ['@babel/preset-typescript']],
  },
}

export const react: RuleSetRule = {
  test: /\.(js|mjs|jsx|ts|tsx)$/,
  loader: require.resolve('babel-loader'),
  include: /src/,
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
  test: /\.(ejs)$/,
  loader: 'ejs-loader',
  exclude: /node-modules/,
  options: {
    variable: 'templateParameters',
  },
}

const styles: RuleSetRule = {
  test: /\.(css)$/,
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
        postcssOptions: {
          ident: 'postcss',
          plugins: [['postcss-preset-env']],
        },
      },
    },
  ],
}

export const less: RuleSetRule = {
  test: /\.(css|less)$/,
  use: (styles.use as Array<RuleSetUseItem>).concat([
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
  ]),
}

export const sass: RuleSetRule = {
  test: /\.(css|scss|sass)$/,
  use: (styles.use as Array<RuleSetUseItem>).concat([
    {
      loader: require.resolve('sass-loader'),
      options: {
        sourceMap: true,
        implementation: require.resolve('sass'),
      },
    },
  ]),
}

export const fonts: RuleSetRule = {
  test: /\.(woff|woff2|otf|ttf|eot)$/,
  type: 'asset',
  parser: {
    dataUrlCondition: {
      maxSize: 0,
    },
  },
}

export const html: RuleSetRule = {
  test: /\.html$/,
  loader: require.resolve('html-loader'),
}

export const images: RuleSetRule = {
  test: [/\.bmp$/, /\.gif$/, /\.webp$/, /\.jpe?g$/, /\.png$/],
  type: 'asset',
  parser: {
    dataUrlCondition: {
      maxSize: 1024,
    },
  },
}
export const svgUrl: RuleSetRule = {
  test: /\.svg$/,
  loader: require.resolve('url-loader'),
  options: {
    limit: 8192,
  },
  issuer: /\.(c|sc|le|sa)ss$/,
}

export const videos: RuleSetRule = {
  test: /\.(mp4|mov|flv)$/,
  type: 'asset/resource',
  parser: {
    dataUrlCondition: {
      maxSize: 0,
    },
  },
}

export const svgComponent: RuleSetRule = {
  test: /\.svg$/,
  exclude: /node_modules/,
  use: [{ loader: require.resolve('@svgr/webpack') }, { loader: require.resolve('url-loader') }],
  issuer: /\.(js|ts)x$/,
}
