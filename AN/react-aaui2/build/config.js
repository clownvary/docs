const path = require('path')

const config = {
  env : process.env.NODE_ENV || 'development',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  dir_base   : path.resolve(__dirname, '..'),
  dir_src    : 'src',
  dir_umd    : 'dist',
  dir_lib    : 'lib',
  dir_es     : 'es',
  dir_bower  : 'amd',
  dir_dist   : 'dist',

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_fail_on_warning : false,
  compiler_quiet           : false,
  compiler_stats           : {
    chunks : false,
    chunkModules : false,
    assets: true,
    colors : true
  },


  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  host : 'localhost',
  port : process.env.PORT || 8080,
}

// ------------------------------------
// Utilities
// ------------------------------------
const resolve = path.resolve
const base = (...args) =>
  Reflect.apply(resolve, null, [config.dir_base, ...args])

config.utils_paths = {
  base: base,
  src: base.bind(null, config.dir_src),
  dist: base.bind(null, config.dir_dist),
}

// ------------------------------------
// Environment
// ------------------------------------
config.globals = {
  'process.env': {
    'NODE_ENV': JSON.stringify(config.env)
  },
  'NODE_ENV': config.env,
  '__DEV__': config.env === 'development',
  '__PROD__': config.env === 'production',
  '__TEST__': config.env === 'test',
  '__BASENAME__': JSON.stringify(process.env.BASENAME || '')
}

module.exports = config
