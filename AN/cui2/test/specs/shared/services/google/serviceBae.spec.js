import AnalyticsServiceBase, { trackLinkEvent,lazyRunFunc } from 'shared/services/google/serviceBase';
import { SERVICE_TYPE, MAX_COUNT } from 'shared/services/google/constType';

function tempSetup () {
  document.domain = 'test';
  window._gaq= [];
  window.ga = (a,b,c,d) => {return null};
  window.__reduxInitialState = {
    configurations: {
      secure_recnet: false
    }
  }
}
describe('shared/services/google/serviceBase', () => {
  it('should initialize serviceBase correctly', () => {
    const _ins = new AnalyticsServiceBase('22');
    expect(_ins.serviceId).toEqual('22');
    const { initializeSpy, initPageSpy, addTransactionSpy } = {
      initializeSpy: jest.spyOn(_ins, 'initialize'),
      initPageSpy: jest.spyOn(_ins, 'initPage'),
      addTransactionSpy: jest.spyOn(_ins, 'addTransaction')
    };
    _ins.initialize();
    _ins.initPage();
    _ins.addTransaction();
    expect(initializeSpy).toHaveBeenCalled();
    expect(initPageSpy).toHaveBeenCalled();
    expect(addTransactionSpy).toHaveBeenCalled();
  });
  it('should run correctly when trigger func trackLinkEvent', () => {
    tempSetup();
    window.__reduxInitialState = {
      configurations: {
        secure_recnet: true
      }
    };
    const mockLink = document.createElement('a');
    mockLink.href = `http://not.test.com`;
    document.documentElement.appendChild(mockLink);
    trackLinkEvent();
    mockLink.click();
    expect(window._gaq).toContainEqual(['_trackEvent', 'Outbound Links', document.domain]);

    const gaSpy = jest.spyOn(window,'ga');
    trackLinkEvent(SERVICE_TYPE.GUA);
    mockLink.click();
    expect(gaSpy).toHaveBeenCalled();
  });
  it('should run correctly when trigger func trackLinkEvent with href contins domain', () => {
    tempSetup();
    const mockLink = document.createElement('a');
    mockLink.href = `http://${document.domain}.test.com`;
    document.documentElement.appendChild(mockLink);

    const gaSpy = jest.spyOn(window,'ga');
    trackLinkEvent(SERVICE_TYPE.GTM);
    mockLink.click();
    expect(window._gaq).toEqual([]);
    expect(gaSpy).not.toHaveBeenCalled();
  });
  it('shuld run correctly when trigger lazyRunFunc ', () => {
    const mockFn = jest.fn();
    window._gaq = {};
    lazyRunFunc(mockFn);
    expect(mockFn).toHaveBeenCalled();
  });
  it('shuld run correctly when trigger lazyRunFunc with globalVariable ==null', () => {
    const mockFn = jest.fn();
    window._gaq = null;
    lazyRunFunc(mockFn);
    lazyRunFunc(null);
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('shuld run correctly when trigger lazyRunFunc with globalVariable ==null', () => {
    jest.useFakeTimers();
    const mockFn = jest.fn();
    window._gaq = null;
    lazyRunFunc(mockFn);
    expect(mockFn).not.toHaveBeenCalled();
    window['_gaq'] = [];
　　jest.runAllTimers();
　　expect(mockFn).toHaveBeenCalled();
　　jest.useRealTimers();
  });

  it('shuld run correctly when throw error', () => {
    jest.useFakeTimers();
    const mockFn =function () {
      throw new Error('Mock error');
    };
    window._gaq = null;
    lazyRunFunc(mockFn);
    window['_gaq'] = [];
　　jest.runAllTimers();
    expect(mockFn).toThrow('Mock error');
　　jest.useRealTimers();
  });

  it('shuld run correctly when trigger lazyRunFunc with count = 0', () => {
    const mockFn = jest.fn();
    window._gaq = null;
    lazyRunFunc(mockFn, { globalVariable: '_gaq',count:10});
    expect(mockFn).not.toHaveBeenCalled();
  });
});
