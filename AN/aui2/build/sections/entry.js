import _debug from 'debug';
import { host, port } from './endPoint';

const debug = _debug('aui:webpack:entry');
export const vendor = [
  'moment',
  'classnames',
  'immutable',
  'prop-types',
  'react',
  'react-dom',
  'redux',
  'react-redux',
  'bluebird',
  'isomorphic-fetch'
];

export default function getEntry(entries) {
  debug('Building entries....');
  debug(`Found ${Object.keys(entries).length} entries!`);

  const hot = [
    // 'react-hot-loader/patch',
    // activate HMR for React
    `webpack-dev-server/client?http://${host}:${port}`,
    // bundle the client for webpack-dev-server and connect to the provided endpoint
    'webpack/hot/only-dev-server'
  ];

  const appEntries = {};
  const isStaticEnv = process.env.NODE_ENV === 'static';
  Object.keys(entries).forEach((entryName) => {
    appEntries[entryName] = isStaticEnv ? hot.concat(entries[entryName]) : entries[entryName];
  });

  if (isStaticEnv) {
    appEntries.jsonMock = ['./test/json/mockup.js'];
  }

  return {
    vendor,
    ...appEntries
  };
}

