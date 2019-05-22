import { includeDirs } from './includes';

export const imageRule = {
  test: /\.(png|jpg|gif)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 2000,
        name: 'images/[name].[ext]'
      }
    }
  ],
  include: includeDirs
};

export default imageRule;
