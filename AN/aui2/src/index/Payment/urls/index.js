const urls = __STATIC__ ? require('./url_dev') : require('./url_prod');

export default Object.assign({}, urls);
