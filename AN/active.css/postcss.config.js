module.exports = {
  plugins: {
    'postcss-reporter': true,
    cssnano: {
      autoprefixer: {
        add: true,
        remove: true,
        browsers: ['last 2 versions', 'ie 9'],
      },
      discardComments: {
        removeAll: true,
      },
      discardDuplicates: true,
      discardUnused: false,
      mergeIdents: false,
      reduceIdents: false,
      safe: false,
      sourcemap: true,
      zindex: false,
    },
  },
}
