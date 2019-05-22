import isFunction from 'lodash/isFunction';
import isNumber from 'lodash/isNumber';
import size from 'lodash/size';
import has from 'lodash/has';
import get from 'lodash/get';
import fill from 'lodash/fill';
import Page from './Page';
import DataSource from './DataSource';


const defaultPageParser = (response) => {
  const {
    body: {
      items: data
    }
  } = response;

  if (has(response, ['headers', 'page_info'])) {
    const pageInfo = get(response, ['headers', 'page_info']);
    const {
          page_number: pageNumber,
          total_records_per_page: pageSize,
          total_records: totalRecords
    } = pageInfo;

    return new Page(data, pageSize, totalRecords, pageNumber);
  }

  return new Page(data);
};

/**
 * @class ServerSource
 * A class that can send a api to server to get data list.
 * @extends {DataSource}
 */
class ServerSource extends DataSource {

  /**
    * @constructor
    * @param {Fuction} api the url that send to server to get data list.
    * @param {Fuction} pageParser  parse page detail, and the default value is defaultPageParser.
    * @param {Arrow} data  data source list.
    * @param {String} keyField the key text of map.
    * @param {Number} pageSize the page size of data list, and the defaulr value is 20.
    */
  constructor(api, pageParser = defaultPageParser, keyField, pageSize = 20) {
    if (isNumber(keyField)) {
      pageSize = keyField;
      keyField = 'id';
    }
    super(keyField, pageSize);

    this.pageMode = pageSize > 1;
    this.totalRecords = 0;
    this.setApi(api, pageParser);
  }

  setApi(api, pageParser = defaultPageParser) {
    if (!isFunction(api)) {
      throw new Error('Invalid API');
    }

    this.api = api;
    this.data = null;
    this.pageParser = pageParser;
  }
  /* istanbul ignore next */
  initChunks(page) {
    if (this.pageMode && page) {
      if (!this.chunks) {
        this.chunks = fill(Array(page.pageCount), null);
        this.totalRecords = page.totalRecords;
      }

      // cache the page in chunk
      this.chunks[page.pageNumber - 1] = page;
    } else {
      this.chunks = null;
    }
  }

  isLoaded() {
    return this.pageMode ? !!this.chunks : !!this.data;
  }

  /** @inheritdoc */
  getData(params) {
    if (this.pageMode) {
      throw new Error('Can not get all data in page mode.');
    }

    if (!this.data) {
      return this.loadPage(0, params);
    }

    return this.delayGet(new Page(this.data));
  }

  /** @inheritdoc */
  getPage(pageNumber = 1, params) {
    if (!this.pageMode) {
      throw new Error('Can not get page in flat mode.');
    }

    const page = this.getChunk(pageNumber);
    if (page) {
      return this.delayGet(page);
    }

    return this.loadPage(pageNumber, params);
  }

  /** @inheritdoc */
  getTotalRecords() {
    if (this.isLoaded()) {
      throw new Error('Can not call this method before loaded.');
    }

    if (this.pageMode) {
      return this.totalRecords;
    }

    return size(this.data || []);
  }

  /** @inheritdoc */
  getPageCount() {
    if (!this.pageMode || this.isLoaded()) {
      throw new Error('Non page mode or data is not loaded.');
    }

    return size(this.chunks);
  }
  /* istanbul ignore next */
  loadPage(pageNumber = 0, params = {}) {
    if (pageNumber > 0) {
      params.pageNumber = pageNumber;
    }

    this.triggerEvent('beforeLoad', params);
    const result = new Promise((resolve, reject) => {
      this.api(params).then((response) => {
        const page = this.pageParser(response);
        page.pageNumber = pageNumber;
        page.next = () => this.getPage(pageNumber + 1);

        if (this.pageMode) {
          this.initChunks(page);
        }

        this.triggerEvent('afterLoad', page);
        resolve(page);
      })
      .catch(error => reject(error));
    });

    return result;
  }


}

export default ServerSource;
