import { Loading } from 'src/services/loading';

jest.mock('lodash/debounce', () => jest.fn(fn => fn));

describe('Loading Service', () => {
  it('loading service should initial correctly', () => {
    const result = {
      counter: 0,
      transactions: {},
      options: { wait: 500 }
    };
    const loadingService = new Loading(null);
    expect(loadingService).toMatchObject(result);
    expect(loadingService.targetElement).toEqual(undefined);
    expect(loadingService.wrapperElement).toEqual(document.createElement('div'));

    const loadingService2 = new Loading();
    expect(loadingService2).toMatchObject(result);
    expect(loadingService2.targetElement).toEqual(undefined);
    expect(loadingService2.wrapperElement).toEqual(document.createElement('div'));

    const loadingService3 = new Loading({ wait: 400 });
    expect(loadingService3.counter).toEqual(0);
    expect(loadingService3.transactions).toEqual({});
    expect(loadingService3.options).toEqual({ wait: 400 });
    expect(loadingService3.targetElement).toEqual(undefined);
    expect(loadingService3.wrapperElement).toEqual(document.createElement('div'));
  });

  it('isLoading should works well ', () => {
    const loadingService = new Loading();
    expect(loadingService.isLoading()).toBeFalsy();
    loadingService.startTransaction();
    expect(loadingService.isLoading()).toBeTruthy();
    loadingService.endTransaction('default');
  });

  it('startTransaction will trigger methods correctly', () => {
    jest.useFakeTimers();
    const loadingService = new Loading({ text: 'test' });
    const showSpy = jest.spyOn(loadingService, 'show');
    const endTransactionSpy = jest.spyOn(loadingService, 'endTransaction');

    loadingService.startTransaction();
    const loadingBar = document.body.getElementsByClassName('loading-bar fullScreen');
    expect(loadingBar.length).toEqual(1);
    expect(loadingBar[0].textContent).toEqual('test');
    expect(showSpy).toHaveBeenCalled();

    jest.runOnlyPendingTimers();
    expect(endTransactionSpy).toHaveBeenCalledWith('default');
    loadingService.endTransaction('default');
    jest.useRealTimers();
  });

  it('startTransaction will not trigger methods when has transaction', () => {
    jest.useFakeTimers();
    const loadingService = new Loading();
    const showSpy = jest.spyOn(loadingService, 'show');
    const endTransactionSpy = jest.spyOn(loadingService, 'endTransaction');
    loadingService.startTransaction();
    loadingService.startTransaction();
    jest.runOnlyPendingTimers();

    expect(showSpy).toHaveBeenCalled();
    expect(endTransactionSpy).toHaveBeenCalled();
    loadingService.endTransaction('default');
  });

  it('endTransaction will not trigger hide methods', () => {
    const loadingService = new Loading();
    const hideSpy = jest.spyOn(loadingService, 'hide');
    loadingService.endTransaction('default');
    expect(hideSpy).not.toHaveBeenCalled();
  });
});
