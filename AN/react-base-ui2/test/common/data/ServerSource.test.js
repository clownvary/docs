import map from 'lodash/map';
import { ServerSource } from 'src/common/data';
import { createAPI } from 'src/common/restClient';
import isPromise from 'src/utils/isPromise';
import Page from 'src/common/data/Page';

const api = createAPI();

const response = {
  headers: {
    response_code: '0000',
    response_message: 'Successful',
    page_info: {
      order_by: '',
      page_number: 1,
      total_records: 0,
      total_records_per_page: 30,
      order_option: 'ASC',
      total_page: 1
    }
  },
  body: {
    is_permit_accessible: 'false',
    message: 'This reservation is currently in use. Please try again later. '
  }
};

const response1 = {
  headers: {
    response_code: '0000',
    response_message: 'Successful'
  },
  body: {
    is_permit_accessible: 'false',
    message: 'This reservation is currently in use. Please try again later. '
  }
};

describe('ServerSource', () => {
  it('ServerSource inits well', () => {
    const source = new ServerSource(api);

    expect(source.totalRecords).toEqual(0);
    expect(source.pageMode).toBeTruthy();

    const source1 = new ServerSource(api, null, 10);

    expect(source1.totalRecords).toEqual(0);
    expect(source1.pageMode).toBeTruthy();

    const source2 = new ServerSource(api, null, 'id', 0);

    expect(source2.totalRecords).toEqual(0);
    expect(source2.pageMode).toBeFalsy();
    expect(source2.data).toBeNull();

    const result = source.pageParser(response);

    expect(result instanceof Page).toBeTruthy();

    const result1 = source.pageParser(response1);

    expect(result1 instanceof Page).toBeTruthy();

    expect(source.setApi).toThrow('Invalid API');
  });


  it('isLoaded works well', () => {
    const source = new ServerSource(api);

    expect(source.isLoaded()).toBeFalsy();

    const source2 = new ServerSource(api, null, 'id', 0);

    expect(source2.isLoaded()).toBeFalsy();
  });

  it('getData works well', () => {
    const source = new ServerSource(api);
    expect(source.getData.bind(source)).toThrow('Can not get all data in page mode.');

    const source2 = new ServerSource(api, null, 'id', 0);

    const result = source2.getData();
    expect(isPromise(result)).toBeTruthy();

    source2.data = [];

    const result1 = source2.getData();
    expect(isPromise(result1)).toBeTruthy();
  });

  it('getPage works well', () => {
    const source = new ServerSource(api);
    source.pageMode = false;
    expect(source.getPage.bind(source)).toThrow('Can not get page in flat mode.');

    const source2 = new ServerSource(api);

    const result = source2.getPage();
    expect(isPromise(result)).toBeTruthy();

    source2.chunks = [1, 2, 3, 4];

    const result1 = source2.getPage();
    expect(isPromise(result1)).toBeTruthy();
  });

  it('getTotalRecords works well', () => {
    const source = new ServerSource(api);

    const result = source.getTotalRecords();
    expect(result).toEqual(0);

    const source2 = new ServerSource(api, null, 'id', 0);
    source2.data = null;

    const result1 = source2.getTotalRecords();
    expect(result1).toEqual(0);

    const source3 = new ServerSource(api);
    source3.isLoaded = () => true;
    expect(source3.getTotalRecords.bind(source3)).toThrow('Can not call this method before loaded.');
  });

  it('getPageCount works well', () => {
    const source = new ServerSource(api);
    const result = source.getPageCount();
    expect(result).toEqual(0);

    const source2 = new ServerSource(api);
    source2.pageMode = false;
    expect(source2.getPageCount.bind(source2)).toThrow('Non page mode or data is not loaded.');
  });
});
