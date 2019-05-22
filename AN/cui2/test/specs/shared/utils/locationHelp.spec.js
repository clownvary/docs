import locationHelp from 'shared/utils/locationHelp';

const map = {};
window.addEventListener = jest.fn((event, cb) => {
  map[event] = cb;
});
const unloadHook = jest.fn();
describe('shared/utils/locationHelp', () => {
  it('is confirm is false locationHelp should correcty', () => {
    locationHelp.redirect('http://www.test.com')
    expect(unloadHook).not.toHaveBeenCalled()
  });

  it('locationHelp notExecuteUnloadCallback should correcty', () => {
    window.confirm = () => true;
    locationHelp.initPromptWhenLeavePage({
      message: 'test message',
      unloadHook
    });
    locationHelp.redirect('http://www.test.com', true);
    expect(locationHelp.notExecuteUnloadCallback).toEqual(true);
  });

  it('locationHelp should correcty', () => {
    window.confirm = () => true;
    locationHelp.redirect('http://www.test.com')
    locationHelp.initPromptWhenLeavePage({
      message: 'test message',
      unloadHook
    });
    locationHelp.redirect('http://www.test.com')
    expect(locationHelp.notExecuteUnloadCallback).toEqual(false);
    expect(unloadHook).toHaveBeenCalled()
    map.beforeunload({});
    locationHelp.initPromptWhenLeavePage({
      message: 'test message',
      unloadHook
    });
  });
  it('is confirm is false locationHelp should correcty', () => {
    window.confirm = () => false;
    locationHelp.initPromptWhenLeavePage({
      message: 'test message',
      unloadHook
    });
    window.event = {}
    locationHelp.redirect('http://www.test1.com')
    map.beforeunload();
  });

});
