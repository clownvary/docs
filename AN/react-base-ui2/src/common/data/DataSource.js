
import size from 'lodash/size';
import isArray from 'lodash/isArray';
import IDataSource from './IDataSource';


/**
 * @class DataSource
 * A class that represents a list of data.
 * @implements {IDataSource}
 */
class DataSource extends IDataSource {
  /**
    * @constructor
    * @param {String} keyField the key text of map, and the defaul value is id.
    * @param {Number} pageSize the page size of data list, and the defaulr value is 20.
    */
  constructor(keyField = 'id', pageSize = 20) {
    super();

    this.keyField = keyField;
    this.pageSize = pageSize;
    this.chunks = null;
  }

  /** @inheritdoc */
  getKeyField() {
    return this.keyField;
  }

  initChunks() {
    this.chunks = [];
  }

  cleanChunks() {
    this.chunks = null;
  }

  getChunk(index) {
    if (!isArray(this.chunks)) {
      return null;
    }
    /* istanbul ignore next */
    const data = index >= 0 ||
      index <= this.getChunksCount() ? this.chunks[index - 1] : [];
    return data;
  }

  getChunksCount() {
    return size(this.chunks);
  }

  delayGet(o) {
    return new Promise((resolve) => {
      resolve(o);
    });
  }
}

export default DataSource;
