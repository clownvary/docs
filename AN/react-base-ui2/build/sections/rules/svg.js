export const svgRule = {
  test: /\.svg$/,
  use: [
    {
      loader: 'svg-sprite-loader',
      options: {
        symbolId: 'an-icon-[name]'
      }
    }
  ],
  include: [/\/svgs\//]
};
export default svgRule;

