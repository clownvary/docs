import path from 'path';

const rootPath = path.resolve();

const include = [
  path.join(rootPath, 'test', 'json')
];

export const jsonRule = {
  test: /\.json$/,
  use: [{
    loader: 'file-loader?name=[path][name].[ext]'
  }],
  include
};

export default jsonRule;
