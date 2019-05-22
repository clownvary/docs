import { includeJadeDirs } from './includes';

const use = [
  'jade-loader'
];

export const jadeRule = {
  test: /\.jade$/,
  use,
  include: includeJadeDirs
};

export default jadeRule;
