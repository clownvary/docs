export const fontRules = {
  test: /\.(eot|ttf|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: 'fonts/[name].[ext]'
      }
    }
  ],
  exclude: [/(\/|\\)assets(\/|\\)/]
};

export default fontRules;
