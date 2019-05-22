import {
  initResourceViewState,
  setEntryPageIndex,
  updateResourceViewState,
  getGlobalState,
  NEW_RESERVATION,
  EDIT_NEW_ADDED_EVENT,
  ADD_EVENT,
  COPY_PERMIT
 } from 'shared/utils/globalStateHelper';
 jest.mock('query-string', () => ({
  parse: jest.fn()
    .mockReturnValueOnce({
      calendar_month_date: '2018-09-09',
      calendar_view_type: 2,
      calendar_date_format: 'YYYY-MM-DD'
    })
    .mockReturnValueOnce({
      calendar_month_date: '2018-02-03',
      calendar_day_date: '2018-03-03',
      calendar_view_type: 1,
      calendar_date_format: 'YYYY-MM-DD'
    })
    .mockReturnValue({})
}));

describe('shared/utils/globalStateHelper', () => {
  it('initResourceViewState should work well when enter to the resource page by new reservation in the confirmation page.', () => {
    initResourceViewState(NEW_RESERVATION, '2018-01-01', '2018-02-02', 'YYYY-MM-DD');
    const globalState = getGlobalState();
    expect(globalState).toEqual({
      calendarMonthDate: '2018-09-09',
      calendarDateFormat: 'YYYY-MM-DD',
      calendarView: 2
    });
  })

  it('initResourceViewState should work well when enter to the resource page from cart page and left resource page in day view.', () => {
    initResourceViewState(NEW_RESERVATION, '2018-01-01', '2018-02-02', 'YYYY-MM-DD');
    const globalState = getGlobalState();
    expect(globalState).toEqual({
      calendarDayDate: '2018-03-03',
      calendarMonthDate: '2018-02-03',
      calendarDateFormat: 'YYYY-MM-DD',
      calendarView: 1
    });
  })

  it('initResourceViewState should work well when enter to the resource page from link out of redesign section.', () => {
    initResourceViewState(NEW_RESERVATION, '2018-01-01', '2018-02-02', 'YYYY-MM-DD');
    const globalState = getGlobalState();
    expect(globalState).toEqual({
      calendarDayDate: '2018-01-01',
      calendarDateFormat: 'YYYY-MM-DD',
      calendarView: 1,
      calendarMonthDate: undefined
    });
  })

  it('initResourceViewState should work well when enter to the resource page by Add Event.', () => {
    initResourceViewState(ADD_EVENT, '2018-01-01', '2018-02-02', 'YYYY-MM-DD');
    const globalState = getGlobalState();
    expect(globalState).toEqual({
      calendarDayDate: '2018-01-01',
      calendarDateFormat: 'YYYY-MM-DD',
      calendarView: 1,
      calendarMonthDate: undefined
    });
  })

  it('initResourceViewState should work well when enter to the resource page by Copy Permit.', () => {
    initResourceViewState(COPY_PERMIT, '2018-01-01', '2018-02-02', 'YYYY-MM-DD');
    const globalState = getGlobalState();
    expect(globalState).toEqual({
      calendarDayDate: '2018-01-01',
      calendarDateFormat: 'YYYY-MM-DD',
      calendarView: 1,
      calendarMonthDate: undefined
    });
  })

  it('initResourceViewState should work well when enter to the resource page from edit existing event.', () => {
    initResourceViewState(EDIT_NEW_ADDED_EVENT, '2018-01-01', '2018-02-02', 'YYYY-MM-DD');
    const globalState = getGlobalState();
    expect(globalState).toEqual({
      calendarDayDate: '2018-02-02',
      calendarDateFormat: 'YYYY-MM-DD',
      calendarView: 1,
      calendarMonthDate: undefined
    });
  })

  it('setEntryPageIndex should work well when enter to the reservation detail page.', () => {
    setEntryPageIndex();
    const globalState = getGlobalState();
    expect(globalState).toEqual({
      calendarDayDate: '2018-02-02',
      calendarDateFormat: 'YYYY-MM-DD',
      calendarView: 1,
      entryPageIndex: undefined,
      calendarMonthDate: undefined
    });
  })

  it('updateResourceViewState should work well when switch from day view to month view.', () => {
    updateResourceViewState('2018-07-07', false);
    const globalState = getGlobalState();
    expect(globalState).toEqual({
      calendarMonthDate: '2018-07-07',
      calendarDateFormat: 'YYYY-MM-DD',
      calendarView: 2,
      entryPageIndex: undefined,
      calendarDayDate: '2018-02-02'
    });
  })

  it('updateResourceViewState should work well when switch from month view to day view.', () => {
    updateResourceViewState('2018-08-07', true);
    const globalState = getGlobalState();
    expect(globalState).toEqual({
      calendarDayDate: '2018-08-07',
      calendarDateFormat: 'YYYY-MM-DD',
      calendarView: 1,
      entryPageIndex: undefined,
      calendarMonthDate: '2018-07-07'
    });
  })
})
