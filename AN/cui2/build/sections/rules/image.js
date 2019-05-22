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
  ]
};

export default imageRule;
