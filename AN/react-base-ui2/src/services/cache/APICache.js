import isArray from 'lodash/isArray';
import size from 'lodash/size';
import filter from 'lodash/filter';
import chunk from 'lodash/chunk';


class APICache {
  constructor(pageSize = 20) {
    this.pageSize = pageSize;
    this.data = [];
    this.filteredData = null;
    this.chunks = [];
  }

  paginate() {
    this.chunks = chunk(this.filteredData || this.data || [], this.pageSize);
  }

  get pageCount() {
    return size(this.chunks);
  }

  get totalRecords() {
    return size(this.filteredData || this.data || []);
  }

  init(data = []) {
    if (!isArray(data)) {
      data = [];
    }
    this.data = data;
    this.filteredData = null;
    this.paginate();
  }

  filter(predicate) {
    this.filteredData = filter(this.data, predicate);
    this.paginate();
  }

  clearFilter() {
    this.filteredData = null;
    this.paginate();
  }

  getPage(pageNumber = 1) {
    const pageIndex = Math.min(this.pageCount, pageNumber) - 1;
    const data = pageIndex >= 0 ? this.chunks[pageIndex] : [];
    return data;
  }

  getPageByReq(req) {
    const {
      headers: {
        page_info: {
          page_number
        }
      }
    } = req;

    const data = this.getPage(page_number);
    const result = new Promise((resolve) => {
      const response = {
        payload: {
          headers: {
            response_code: '0000',
            response_message: 'Successful',
            page_info: {
              order_by: '',
              total_records: this.totalRecords,
              total_records_per_page: this.pageSize,
              page_number,
              order_option: 'ASC',
              total_page: this.pageCount
            }
          },
          body: {
            items: data,
            timestamp: new Date().getTime()
          }
        }
      };

      resolve(response);
    });

    return result;
  }
}

export default APICache;
