import path from 'path';

export const rootPath = path.resolve();

const include = [
  path.join(rootPath, 'src')
];

const use = [
  'jade-loader'
];

export const jadeRule = {
  test: /\.jade$/,
  use,
  include
};

export default jadeRule;
