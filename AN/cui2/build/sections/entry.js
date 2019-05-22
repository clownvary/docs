import glob from 'glob';
import path from 'path';
import _debug from 'debug';
import last from 'lodash/last';
import parsePath from 'parse-filepath';

const debug = _debug('anet-cui:webpack:entry');
debug('Building entries....');

export const vendor = [
  'moment',
  'classnames',
  'immutable',
  'prop-types',
  'react',
  'react-dom',
  'redux',
  'react-redux',
  'react-router-redux',
  'active.css',
  'bluebird',
  'isomorphic-fetch'
];

if (process.env.NODE_ENV === 'static') {
  vendor.push('react-hot-loader');
}

const _appEntries = {};
const rootPath = path.resolve();
const appPattern = path.join(rootPath, 'src/*/app.jsx');
const appFiles = glob.sync(appPattern);

if (appFiles) {
  appFiles.forEach((f) => {
    const dirName = parsePath(f).dirname;
    const moduleName = last(dirName.split('/'));
    const entryName = `app.${moduleName}`;
    _appEntries[entryName] = [f];
    debug(`[${entryName}]=${f}`);
  });
}

debug(`Found ${Object.keys(_appEntries).length} entries!`);

export const appEntries = _appEntries;

export default {
  vendor,
  ...appEntries
};
