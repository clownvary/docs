import React from 'react';
import { browser } from 'src/utils';
import { OS } from 'src/consts';
import { createPopupService } from 'src/services/popup';



class MockComponent extends React.PureComponent {
  render() {
    return (<div className="mock-component" />);
  }
}

describe('services/popup/createPopupService', () => {
  let changeTarget;
  let cancelTarget;

  beforeEach(() => {
    changeTarget = document.createElement('div');
    cancelTarget = document.createElement('div');

    changeTarget.setAttribute('class', 'target change-target');
    cancelTarget.setAttribute('class', 'target cancel-target');

    document.body.appendChild(changeTarget);
    document.body.appendChild(cancelTarget);
  });

  afterEach(() => {
    document.body.removeChild(changeTarget);
    document.body.removeChild(cancelTarget);
  });

  test('basic usage', () => {
    const MockChangeService = createPopupService(MockComponent, {}, { disableScroll: false });
    const MockCancelService = createPopupService(MockComponent);
    const onBeforeOpen = jest.fn();

    onBeforeOpen.mockImplementationOnce(() => false);
    expect(MockChangeService.popup({ target: changeTarget, onBeforeOpen })).toBeNull();

    onBeforeOpen.mockImplementation(() => true);
    const changePopup = MockChangeService.popup({ target: changeTarget, onBeforeOpen });
    const cancelPopup = MockCancelService.popup({ target: cancelTarget, autoClose: 1 });

    const containers = document.querySelectorAll('.an-popup');
    expect(containers.length).toBe(2);

    const changeResult = changePopup.result.then((value) => {
      expect(value).toBe('test value');
    });
    changePopup.change('test value');

    const cancelResult = cancelPopup.result.catch((e) => {
      expect(e).toBe('Popup is canceled');
    });

    return Promise.all([changeResult, cancelResult]);
  });

  test('container and cache handling', () => {
    const MockSerivce = createPopupService(MockComponent);
    const popup = MockSerivce.popup({ target: changeTarget, cache: true });
    let popupAgain;

    let result = popup.result.then(() => {
      expect(document.querySelectorAll('.an-popup').length).toBe(1);
      popupAgain = MockSerivce.popup({ target: changeTarget, cache: true });
      popupAgain.change('test');
      return popupAgain.result;
    });
    popup.change('test');

    result = result.then(() => {
      MockSerivce.clearCache();
      expect(document.querySelectorAll('.an-popup').length).toBe(1);
      MockSerivce.clearCache(null);
      expect(document.querySelectorAll('.an-popup').length).toBe(1);
      MockSerivce.clearCache({ target: cancelTarget });
      expect(document.querySelectorAll('.an-popup').length).toBe(1);
      MockSerivce.clearCache({ target: changeTarget });
      expect(document.querySelectorAll('.an-popup').length).toBe(0);
    });

    return result;
  });

  test('misc', () => {
    const MockService = createPopupService(MockComponent);
    Object.defineProperty(browser, 'os', { get: () => OS.MAC });
    const popup = MockService.popup({ target: changeTarget, autoClose: 1 });
    return popup.result.catch((e) => {
      expect(e).toBe('Popup is canceled');
    });
  });
});
