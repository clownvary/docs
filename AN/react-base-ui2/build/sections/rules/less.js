import cssnano from 'cssnano';
import postcssCustomMedia from 'postcss-custom-media';
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
import { includeDirs } from './includes';

const postcss = () => ([
  postcssCustomMedia,
  cssnano({
    autoprefixer: {
      browsers: ['last 2 versions', 'ie 11'],
      add: true,
      remove: true
    }
  })
]);

const prod = process.env.NODE_ENV === 'production';

const use = [
  {
    loader: 'css-loader',
    options: {
      minimize: prod,
      sourceMap: !prod,
      autoprefixer: false
    }
  }, {
    loader: 'postcss-loader',
    options: {
      plugins: postcss
    }
  }, {
    loader: 'less-loader',
    options: {
      sourceMap: !prod
    }
  }
];

export const lessRule = {
  test: /\.(less|css)$/,
  use: [
    { loader: 'style-loader' },
    ...use
  ],
  include: includeDirs
};

export const lessRuleExtract = {
  test: /\.(less|css)$/,
  use: ExtractTextWebpackPlugin.extract({
    fallback: 'style-loader',
    use,
    publicPath: '../'
  }),
  include: includeDirs
};
