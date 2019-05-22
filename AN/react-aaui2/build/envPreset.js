const presets = require('babel-preset-env')

const BABEL_ENV = process.env.BABEL_ENV

module.exports = {
  presets: [
    [presets, {
      targets: {
        browsers: ["last 2 versions", "ie >= 10"],
      },
      loose: true,
      modules: BABEL_ENV === 'es' ? false : 'commonjs',
    }],
  ],
}
