import SelectionManager from 'src/components/ResourceCalendar/common/SelectionManager';
import { addClass, removeClass } from 'src/utils/dom';

jest.mock('src/utils/dom', () => {
  return {
    addClass: jest.fn(),
    removeClass: jest.fn()
  };
});
describe('src/components/ResourceCalendar/common/SelectionManager', () => {

  it('should initial well', () => {
    expect(SelectionManager.element).toEqual(document);
    expect(SelectionManager.activeSeg).toEqual(null);
  });
  it('select method should work well', () => {
    const seg = { eventKey: 'test key' };
    const ele = document.createElement('div');
    document.body.appendChild(ele);
    const nodes = document.querySelectorAll(`div[data-event-id="${seg.eventKey}"]`);

    SelectionManager.select(seg);
    expect(SelectionManager.activeSeg).toEqual(seg);
    expect(addClass).toHaveBeenCalledWith(nodes, 'seg-active');
  });

  it('clear method should work well', () => {
    const seg = { eventKey: 'test key' };
    const ele = document.createElement('div');
    document.body.appendChild(ele);
    const nodes = document.querySelectorAll('.seg-active');

    SelectionManager.select(seg);
    SelectionManager.clear();
    expect(SelectionManager.activeSeg).toEqual(null);
    expect(removeClass).toHaveBeenCalledWith(nodes, 'seg-active');
  });
});
