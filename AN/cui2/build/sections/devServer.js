import path from 'path';
import { host, port } from './endPoint';

const rootPath = path.resolve();
export const devServer = {
  host,
  port,
  compress: true, // enable gzip compression
  historyApiFallback: true, // true for index.html upon 404, object for multiple paths
  hot: true,
  // enable HMR on the server
  contentBase: path.join(rootPath, 'dist'),
  // match the output path
  publicPath: `http://${host}:${port}/`,
  // match the output `publicPath`
  quiet: false,
  noInfo: false,
  lazy: false,
  stats: {
    colors: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
};

export default devServer;
