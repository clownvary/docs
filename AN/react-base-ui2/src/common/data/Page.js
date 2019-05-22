import ceil from 'lodash/ceil';
import identity from 'lodash/identity';

const pageProps = [
  'pageSize',
  'totalRecords',
  'pageCount',
  'pageNumber'
];

const defaultPage = {
  pageSize: 20,
  totalRecords: 0,
  pageCount: 0,
  pageNumber: 1
};

/**
 * @class Page
 * A class that represents a list of data by page as the unit.
 */
class Page {

  /**
    * @constructor
    * @param {Arrow} data  data source list
    * @param {String} keyField the key text of map, and the defaul value is id.
    * @param {Number} pageSize the page size of data list, and the defaulr value is 20.
    * @param {Number} totalRecords The whole pages by page size, and the defaulr value is 0.
    * @param {Number} pageNumber the current page number, and the defaulr value is 0.
    */
  constructor(data, pageSize = 20, totalRecords = 0, pageNumber = 0) {
    this.data = data;
    this.pageSize = pageSize === 0 ? -1 : pageSize;
    this.totalRecords = totalRecords;
    this.pageCount = ceil(this.totalRecords / this.pageSize);
    this.pageNumber = pageNumber;
    this.next = identity;
  }
  /* istanbul ignore next */
  get error() {
    if (this.pageNumber <= 0 || this.pageNumber > this.pageCount) {
      return 'Out of range';
    }

    return '';
  }
  /* istanbul ignore next */
  hasNext() {
    return this.pageNumber < this.pageCount;
  }
}

export default Page;

export {
  Page,
  defaultPage,
  pageProps
};
