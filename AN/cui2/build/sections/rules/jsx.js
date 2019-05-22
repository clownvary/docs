import path from 'path';

export const rootPath = path.resolve();

const include = [
  path.join(rootPath, 'src'),
  path.join(rootPath, 'i18n'),
  path.join(rootPath, 'test'),
  path.join(rootPath, 'node_modules', 'react-base-ui')
];

const use = [
  {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true
    }
  }
];

export const jsxRule = {
  test: /\.(jsx|js)$/,
  use,
  include
};

export default jsxRule;
