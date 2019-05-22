import { includeDirs } from './includes';

const use = [
  'react-hot-loader',
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
  include: includeDirs
};

export default jsxRule;
