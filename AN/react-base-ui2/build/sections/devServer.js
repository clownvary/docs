import path from 'path';
import output from './output';
import { host, port } from './endPoint';

const rootPath = path.resolve();
export const devServer = {
  host,
  port,
  compress: true, // enable gzip compression
  historyApiFallback: true, // true for index.html upon 404, object for multiple paths
  hot: true,
  contentBase: path.join(rootPath, 'dist'),
  publicPath: output.publicPath,
  quiet: false,
  noInfo: false,
  lazy: false,
  stats: {
    colors: true,
    chunks: false,
    chunkModules: false,
    modules: false,
    errorDetails: true
  }
};

export default devServer;
