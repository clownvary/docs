import map from 'lodash/map';
import { ClientSource } from 'src/common/data';
import { SortOrder } from 'src/consts';
import isPromise from 'src/utils/isPromise';

const data = map(Array(234), (d, i) => ({
  text: `Text${i}`,
  value: `Value_${i}`
}));

describe('ClientSource', () => {
  it('ClientSource inits well', () => {
    const source = new ClientSource(data, 10);

    expect(source.pageSize).toEqual(10);
    expect(source.data.length).toEqual(234);
    expect(source.data).toMatchObject(data);
    expect(source.filteredData).toBeNull();
    expect(source.sortFields).toBeNull();


    const source1 = new ClientSource(data, 'id', 10);

    expect(source1.pageSize).toEqual(10);
    expect(source1.data.length).toEqual(234);
    expect(source1.data).toMatchObject(data);

    const source2 = new ClientSource([], 'id', 0);

    expect(source2.pageSize).toEqual(0);
    expect(source2.data.length).toEqual(0);
    expect(source2.data).toMatchObject([]);
  });


  it('getPage works fine', () => {
    const source = new ClientSource(data, 'id', 10);
    const tempData = map(Array(10), (d, i) => ({
      text: `Text${i}`,
      value: `Value_${i}`
    }));
    const page = source.getPage();
    expect(isPromise(page)).toBeTruthy();
    expect(page._v.data).toMatchObject(tempData);
  });


  it('getData works fine', () => {
    const source = new ClientSource(data, 'id', 10);
    const result = source.getData();
    expect(isPromise(result)).toBeTruthy();
    expect(result._v.data).toMatchObject(data);
  });

  it('getTotalRecords works fine', () => {
    const source = new ClientSource(data, 'id', 10);
    const total = source.getTotalRecords();
    expect(total).toBe(data.length);

    const source2 = new ClientSource(null, 'id', 0);

    expect(source2.getTotalRecords()).toEqual(0);
  });

  it('getPageCount works fine', () => {
    const source = new ClientSource(data, 'id', 10);
    const count = source.getPageCount();
    expect(count).toBe(24);
  });

  it('sort works fine', () => {
    const source = new ClientSource(data, 'id', 10);
    source.sort();
    expect(source.sortFields).toBeNull();


    const fields = ['text'];
    source.sort(fields, SortOrder.DESC);
    expect(source.sortFields).toMatchObject(fields);
    expect(source.sortOrder).toEqual(SortOrder.DESC);

    source.sort(fields);
    expect(source.sortFields).toMatchObject(fields);
    expect(source.sortOrder).toEqual(SortOrder.ASC);
  });

  it('filter works fine', () => {
    const source = new ClientSource(data, 'id', 10);
    source.filter(item => item.value === 'Value_0');
    expect(source.filteredData).toMatchObject([{
      text: `Text${0}`,
      value: `Value_${0}`
    }]);

    source.rawData = [];

    source.filter(item => item.value === 'Value_0');
    expect(source.filteredData).toMatchObject([]);
  });

  it('clearFilter works fine', () => {
    const source = new ClientSource(data, 'id', 10);
    source.clearFilter();
    expect(source.filteredData).toBeNull();
  });
});
