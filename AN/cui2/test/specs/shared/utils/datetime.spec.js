import { getDateTimeFormatsById } from 'shared/utils/datetime';

describe('shared/utils/datetime', () => {
  it('map system config to format correctly', () => {
    expect(getDateTimeFormatsById().dateFormat).toEqual('MMM D, YYYY');
    expect(getDateTimeFormatsById(0, 0).dateFormat).toEqual('MMM D, YYYY');
    expect(getDateTimeFormatsById(3, 3).timeFormat).toEqual('h:mm A');
  })
});
