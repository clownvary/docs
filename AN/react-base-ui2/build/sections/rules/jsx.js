import { includeDirs } from './includes';

const use = [
  'react-hot-loader',
  {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: ['latest', 'stage-0', 'react'],
      plugins: ['transform-runtime', 'add-module-exports']
    }
  }
];

export const jsxRule = {
  test: /\.(jsx|js)$/,
  use,
  include: includeDirs
};

export default jsxRule;
