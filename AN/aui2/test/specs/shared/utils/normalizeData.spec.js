import normalizeData from 'shared/utils/normalizeData';

describe('shared/utils/normalizeData', () => {
  test('normalizeData method should work fine', () => {
    const data = [{
      id: 1,
      name: 'banana',
      selected: true
    }, {
      id: 2,
      name: 'apple',
      selected: false
    }];
    const result = normalizeData(data);

    expect(result).toEqual({
      data: [{
        id: 1,
        name: 'banana',
        selected: true,
        text: 'banana',
        value: 1
      }, {
        id: 2,
        name: 'apple',
        selected: false,
        text: 'apple',
        value: 2
      }],
      selected: [1]
    });
  });

  test('normalizeData method should work fine, if the length of data is 0', () => {
    const result = normalizeData();
    expect(result).toEqual({ data: [], selected: [] });
  });

  test('normalizeData method should work fine', () => {
    const data = [{
      id: 1,
      name: 'banana',
      selected: true
    }, {
      id: 2,
      name: 'apple',
      selected: false
    }];
    const result = normalizeData(data);

    expect(result).toEqual({
      data: [{
        id: 1,
        name: 'banana',
        selected: true,
        text: 'banana',
        value: 1
      }, {
        id: 2,
        name: 'apple',
        selected: false,
        text: 'apple',
        value: 2
      }],
      selected: [1]
    });
  });

  test('normalizeData method should work fine, if the length of data is 0', () => {
    const result = normalizeData();
    expect(result).toEqual({
      data: [],
      selected: []
    });
  });
});
