import addEvent from 'src/utils/addEvent';

describe('utils/addEvent', () => {
  it('addEvent should call attachEvent correctly', () => {
    const ele = document.createElement('div');
    ele.attachEvent = jest.fn();
    const cbSpy = jest.fn();
    addEvent(ele, 'test', cbSpy);
    expect(ele.attachEvent).toHaveBeenCalledWith('ontest', cbSpy);
  });
  it('addEvent should call addEventListener correctly', () => {
    const ele = document.createElement('div');
    ele.addEventListener = jest.fn();
    const cbSpy = jest.fn();
    addEvent(ele, 'test', cbSpy);
    expect(ele.addEventListener).toHaveBeenCalledWith('test', cbSpy);
  });
});
