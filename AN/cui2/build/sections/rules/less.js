import path from 'path';
import cssnano from 'cssnano';
import postcssCustomMedia from 'postcss-custom-media';
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';


const rootPath = path.resolve();
const include = [
  path.join(rootPath, 'src'),
  path.join(rootPath, 'node_modules', 'active.css'),
  path.join(rootPath, 'node_modules', 'react-base-ui')
];

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
  test: /\.less$/,
  use: [
    { loader: 'style-loader' },
    ...use
  ],
  include
};

export const lessRuleExtract = {
  test: /\.less$/,
  use: ExtractTextWebpackPlugin.extract({
    fallback: 'style-loader',
    use,
    publicPath: '../'
  }),
  include
};
