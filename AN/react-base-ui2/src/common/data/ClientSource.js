
import size from 'lodash/size';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import isNumber from 'lodash/isNumber';
import filter from 'lodash/filter';
import chunk from 'lodash/chunk';
import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';
import Page from './Page';
import DataSource from './DataSource';
import { SortOrder } from '../../consts';

/**
 * @class ClientSource
 * A class that represents a list of data.
 * @extends {DataSource}
 */
class ClientSource extends DataSource {

   /**
    * @constructor
    * @param {map} data  data source list
    * @param {String} keyField the key text of map.
    * @param {Number} pageSize the page size of data list, and the defaulr value is 20.
    */
  constructor(data, keyField, pageSize = 20) {
    if (isNumber(keyField)) {
      pageSize = keyField;
      keyField = 'id';
    }
    super(keyField, pageSize);
    this.setData(data);
  }

  setData(data) {
    this.rawData = data;
    this.data = data;
    this.filteredData = null;
    this.sortFields = null;
    this.sortOrder = SortOrder.ASC;
    this.initChunks();
  }

  initChunks() {
    if (this.pageSize > 0 && isArray(this.data)) {
      this.chunks = chunk(this.data, this.pageSize);
    }
  }

  /** @inheritdoc */
  getData() {
    return this.delayGet(new Page(this.data));
  }

  /** @inheritdoc */
  getPage(pageNumber = 1) {
    /* istanbul ignore next */
    const data = this.getChunk(pageNumber) || [];
    /* istanbul ignore next */
    if (!data) {
      throw new Error('Chunk is not initialized');
    }

    const page = new Page(data, this.pageSize, this.getTotalRecords(), pageNumber);
    /* istanbul ignore next */
    page.next = () => this.getPage(pageNumber + 1);

    return this.delayGet(page);
  }

  /** @inheritdoc */
  getTotalRecords() {
    return size(this.data || []);
  }

  /** @inheritdoc */
  getPageCount() {
    return this.getChunksCount();
  }

  /** @inheritdoc */
  sort(fields = [], sortOrder = SortOrder.ASC) {
    if (isEmpty(fields) || sortOrder === SortOrder.ORIGIN) {
      this.clearSort();
    } else {
      this.sortFields = fields;
      this.sortOrder = sortOrder;
      this.doSort();
    }
  }

  /** @inheritdoc */
  clearSort() {
    this.sortFields = null;
    this.sortOrder = SortOrder.ORIGIN;
    this.doSort();
  }

  /** @inheritdoc */
  filter(filterFunc) {
    /* istanbul ignore next */
    this.filteredData = filter(this.rawData || [], filterFunc);
    this.doSort();
  }

  /** @inheritdoc */
  clearFilter() {
    this.filteredData = null;
    this.doSort();
  }

  /** @inheritdoc */
  doSort() {
    /* istanbul ignore next */
    const data = this.filteredData || this.rawData || [];
    let sortedData = data;
    if (!isEmpty(this.sortFields) && this.sortOrder !== SortOrder.ORIGIN) {
      sortedData = sortBy(data, this.sortFields);
      if (this.sortOrder === SortOrder.DESC) {
        sortedData = reverse(sortedData);
      }
    }

    this.data = sortedData;
    this.initChunks();
  }
}

export default ClientSource;
