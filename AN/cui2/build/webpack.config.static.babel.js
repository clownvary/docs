import config from './webpack.config.babel';
import { host, port } from './sections/endPoint';
import { vendor, appEntries } from './sections/entry';
import { devServer } from './sections/devServer';

const hot = [
  'webpack/hot/only-dev-server',
  `webpack-dev-server/client?http://${host}:${port}`,
  'react-hot-loader/patch'
];

const hotAppEntries = {};
Object.keys(appEntries).forEach((key) => {
  hotAppEntries[key] = hot.concat(appEntries[key]);
});

export default {
  ...config,
  entry: { vendor, ...hotAppEntries },
  devServer
};
