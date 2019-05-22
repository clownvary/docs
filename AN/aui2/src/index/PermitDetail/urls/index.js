let urls = require('./url_prod');

if (__STATIC__) {
  /* eslint-disable */
  urls = require('./url_dev');
  /* eslint-enable */
}

export default Object.assign({}, urls);
