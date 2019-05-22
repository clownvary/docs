// the test suite is used to mock shared/utils/iframe.js return values

import configureStore from "redux-mock-store";
import middlewares from 'shared/api/middlewares';
import * as authority from 'shared/actions/Authority';
import { registerResize } from 'shared/components/Root';

jest.mock('shared/utils/iframe', () => ({
  getParentFrameHeight: jest.fn().mockReturnValue(500),
  getParentFrameWidth: jest.fn().mockReturnValue(1200).mockReturnValueOnce(1000),
  isInIframe: jest.fn().mockReturnValue(true),
  setIFrameHeight: jest.fn(),
  setIFrameWidth: jest.fn(),
  minFrameWidth: 1000,
  minHeight: 400,
  scrollbarHeight: 20
}));

jest.mock('lodash/debounce', () => jest.fn(fn => fn));

describe('shared -> components -> Root(mock iframe.js values)', () => {
  let store = null;
  let fetchAuthoritiesStub = null;

  beforeAll(() => {
    fetchAuthoritiesStub = authority.fetchAuthorities = jest.fn(() => Promise.resolve({
      types: ['FETCH_AUTHORITIES', 'FETCH_AUTHORITIES_SUCESS', 'FETCH_AUTHORITIES_FAILURE'],
      promise: Promise.resolve({ payload: {} })
    }));
  });

  afterAll(function () {
    fetchAuthoritiesStub.clearAllTimers();
  });

  beforeEach(() => {
    const appRoot = document.createElement('div');
    appRoot.setAttribute('id', 'app-root');
    document.body.appendChild(appRoot);

    const mockStore = configureStore(middlewares);
    store = mockStore({});
    parent.name = 'sdi_main';
  });

  afterEach(() => {
    document.body.removeChild(document.getElementById('app-root'));

    store.clearActions();
    parent.name = '';
  });

  it('should call registerResize function correctly', () => {
    const resizeCallback = jest.fn();
    registerResize(resizeCallback);
    $(parent).resize();
    expect(resizeCallback).toHaveBeenCalledTimes(1);

    parent.name = '';
    registerResize();
    $(parent).resize();
    expect(resizeCallback).toHaveBeenCalledTimes(2);

    $(parent).resize();
    expect(resizeCallback).toHaveBeenCalledTimes(3);
  });
});
