let urls = require('./url_prod');
/* eslint-disable global-require */
if (__STATIC__) {
  urls = require('./url_dev');
}

export default Object.assign({}, urls);
