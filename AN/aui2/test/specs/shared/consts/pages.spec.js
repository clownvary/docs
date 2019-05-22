import { buildUrl } from 'shared/consts/pages';
jest.mock('shared/utils/globalStateHelper', () => ({
  getGlobalState: jest.fn()
    .mockReturnValueOnce({})
    .mockReturnValueOnce({
      entryPageIndex: 1,
      calendarMonthDate: '2018 01 01',
      calendarView: 1,
      calendarDateFormat: 'YYY MM DD'
    })
    .mockReturnValue({}),
  getQueryParams: jest.fn().mockReturnValue({})
}));


describe('shared/consts/pages', () => {
  it('buildUrl should work well', () => {
    __STATIC__ = false;
    const url = buildUrl(0, {});
    expect(url).toEqual('/ui.do?method=booking&entry_page_index=undefined&calendar_month_date=undefined&calendar_day_date=undefined&calendar_view_type=undefined&calendar_date_format=undefined');
    const url1 = buildUrl(0, { source_page_index: 1 });
    expect(url1).toEqual('/ui.do?method=booking&source_page_index=1&entry_page_index=1&calendar_month_date=2018 01 01&calendar_day_date=undefined&calendar_view_type=1&calendar_date_format=YYY MM DD');
    const url2 = buildUrl(0);
    expect(url2).toEqual('/ui.do?method=booking&calendar_month_date=undefined&calendar_day_date=undefined&calendar_view_type=undefined&calendar_date_format=undefined');
    const url3 = buildUrl('/ui.do?method=booking&permit_id=0');
    expect(url3).toEqual('/ui.do?method=booking&permit_id=0&calendar_month_date=undefined&calendar_day_date=undefined&calendar_view_type=undefined&calendar_date_format=undefined');
    const url4 = buildUrl('/ui.do?method=booking&permit_id=0');
    expect(url4).toEqual('/ui.do?method=booking&permit_id=0&calendar_month_date=undefined&calendar_day_date=undefined&calendar_view_type=undefined&calendar_date_format=undefined');
    __STATIC__ = true;
  })
});
