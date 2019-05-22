import map from 'lodash/map';
import { APICache } from 'src/services/cache';
import isPromise from 'src/utils/isPromise';

describe('APICache Service', () => {
  it('init works fine', () => {
    const apiCache = new APICache();
    expect(apiCache.pageSize).toEqual(20);
    expect(apiCache.data.length).toEqual(0);
    expect(apiCache.filteredData).toBeNull();
    expect(apiCache.chunks.length).toEqual(0);
    expect(apiCache.totalRecords).toEqual(0);

    apiCache.init();
    expect(apiCache.totalRecords).toEqual(0);

    apiCache.init(null);
    expect(apiCache.totalRecords).toEqual(0);


    const pageSize = 7;
    const apiCache1 = new APICache(pageSize);
    const datdSize = 234;
    const data = map(Array(datdSize), (d, i) => ({
      text: `Text${i}`,
      value: `Value_${i}`
    }));

    apiCache1.init(data);
    expect(apiCache1.pageSize).toEqual(pageSize);
    expect(apiCache1.data.length).toEqual(datdSize);
    expect(apiCache1.pageCount).toEqual(34);
    expect(apiCache1.totalRecords).toEqual(datdSize);

    apiCache1.data = null;
    apiCache1.filteredData = null;
    apiCache1.paginate();
    expect(apiCache1.pageCount).toEqual(0);
    expect(apiCache1.totalRecords).toEqual(0);
  });

  it('getPage works fine', () => {
    const pageSize = 7;
    const apiCache = new APICache(pageSize);
    const datdSize = 234;
    const data = map(Array(datdSize), (d, i) => ({
      text: `Text${i}`,
      value: `Value_${i}`
    }));

    apiCache.init(data);
    const tempData = map(Array(7), (d, i) => ({
      text: `Text${i}`,
      value: `Value_${i}`
    }));
    expect(apiCache.getPage()).toMatchObject(tempData);

    expect(apiCache.getPage(-1).length).toEqual(0);
    expect(apiCache.getPage(7).length).toEqual(7);
    //  35  TotalPage
    expect(apiCache.getPage(34).length).toEqual(3);
    //  35 > TotalPage
    expect(apiCache.getPage(35).length).toEqual(3);
  });

  it('filter works fine', () => {
    const pageSize = 7;
    const apiCache = new APICache(pageSize);
    const datdSize = 234;
    const data = map(Array(datdSize), (d, i) => ({
      text: `Text${i}`,
      value: `Value_${i}`
    }));

    apiCache.init(data);

    apiCache.filter({ value: `Value_${500}` });
    expect(apiCache.filteredData).toMatchObject([]);
    apiCache.clearFilter();
    apiCache.filter({ value: `Value_${1}` });
    expect(apiCache.filteredData.length).toEqual(1);
  });

  it('getPageByReq works fine', () => {
    const pageSize = 7;
    const apiCache = new APICache(pageSize);
    const datdSize = 234;
    const data = map(Array(datdSize), (d, i) => ({
      text: `Text${i}`,
      value: `Value_${i}`
    }));

    apiCache.init(data);

    const result = apiCache.getPageByReq({ headers: {
      page_info: {
        page_number: 1
      }
    } });

    expect(isPromise(result)).toBeTruthy();
  });
});

