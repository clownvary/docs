
import Evented from '../Evented';
import { SortOrder } from '../../consts';


/**
 * @interface IDataSource
 * An interface that represents a list of data.
 */
class IDataSource extends Evented {
  constructor() {
    super('DataSource');
  }

  /**
   * Get data list
   * @returns {array}
   */
  /* istanbul ignore next */
  getData() {
    console.log('[IDataSource] Method not implemented.');
  }

  /**
   * Get key field
   * @returns {string}
   */
  /* istanbul ignore next */
  getKeyField() {
    console.log('[IDataSource] Method not implemented.');
  }

  /**
   * Get page number
   * @returns {number}
   */
  /* istanbul ignore next */
  getPage(pageNumber = 1) {
    console.log(pageNumber);
    console.log('[IDataSource] Method not implemented.');
  }

  /**
   * Get total records
   * @returns {number}
   */
  /* istanbul ignore next */
  getTotalRecords() {
    console.log('[IDataSource] Method not implemented.');
  }

  /**
   * Get page count
   * @returns {number}
   */
  /* istanbul ignore next */
  getPageCount() {
    console.log('[IDataSource] Method not implemented.');
  }

  /**
   * Sort the data
   * @param fields {array}
   * @param sortOrder {string} the default order is ASC.
   */
  /* istanbul ignore next */
  sort(fields = [], sortOrder = SortOrder.ASC) {
    console.log(sortOrder);
    console.log('[IDataSource] Method not implemented.');
  }

  /**
   * Clear sort
   */
  /* istanbul ignore next */
  clearSort() {
    console.log('[IDataSource] Method not implemented.');
  }

  /**
   * Filter the data
   */
  /* istanbul ignore next */
  filter(filterFunc) {
    console.log(filterFunc);
    console.log('[IDataSource] Method not implemented.');
  }

  /**
   * Clear filter
   */
  /* istanbul ignore next */
  clearFilter() {
    console.log('[IDataSource] Method not implemented.');
  }
}

export default IDataSource;
