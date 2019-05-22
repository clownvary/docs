import cloneDeep from 'lodash/cloneDeep';
import PositionCalculator from 'src/services/popup/components/PositionCalculator';
import { Dock } from 'src/consts';


const stepResults = [
  {
    moveBy: { y: 552, x: 194 },
    distance: { top: -552, left: -194, bottom: -273, right: 1485, overflow: ['bottom'] },
    mainAt: 'top left',
    targetAt: 'bottom left',
    pos: { top: 552, left: 194, height: 302, width: 241 }
  },
  {
    moveBy: { y: 552, x: 194 },
    distance: { top: -552, left: -194, bottom: 273, right: 1485, overflow: null },
    mainAt: 'top left',
    targetAt: 'bottom left',
    pos: { top: 552, left: 194, height: 302, width: 241 }
  }
];

const finalResults = [
  {
    moveBy: { y: 279, x: 194 },
    distance: { top: -279, left: -194, bottom: 0, right: 1485, overflow: null },
    mainAt: 'top left',
    targetAt: 'bottom left',
    pos: { top: 279, left: 194, height: 302, width: 241 }
  },
  {
    moveBy: { y: 552, x: 194 },
    distance: { top: -552, left: -194, bottom: 273, right: 1485, overflow: null },
    mainAt: 'top left',
    targetAt: 'bottom left',
    pos: { top: 552, left: 194, height: 302, width: 241 },
    fliped: true
  },
  {
    moveBy: { y: 552, x: 194 },
    distance: { top: -552, left: -194, bottom: -273, right: 1485, overflow: ['bottom'] },
    mainAt: 'top left',
    targetAt: 'bottom left',
    pos: { top: 552, left: 194, height: 302, width: 241 }
  },
  {
    moveBy: { y: 0, x: 0 },
    distance: { top: 0, left: 0, bottom: 0, right: 0, overflow: null },
    mainAt: null,
    targetAt: null,
    pos: { width: 0, height: 0, top: 0, left: 0 }
  },
  {
    moveBy: { y: 0, x: 0 },
    distance: { top: 0, left: 0, bottom: 0, right: 0, overflow: null },
    mainAt: 'left bottom',
    targetAt: 'right top',
    pos: { width: 0, height: 0, top: 0, left: 0 }
  },
  {
    moveBy: { y: 0, x: 0 },
    distance: { top: 0, left: 0, bottom: 0, right: 0, overflow: null },
    mainAt: 'bottom left',
    targetAt: 'bottom left',
    pos: { width: 0, height: 0, top: 0, left: 0 }
  }
];

describe('services/popup/components/PositionCalculator', () => {
  const main = document.createElement('div');
  const target = document.createElement('div');

  test('basic usage', () => {
    let pc;

    try {
      pc = new PositionCalculator();
    } catch (e) {
      expect(e.message).toBe('main can not be empty');
    }

    pc = new PositionCalculator({
      main,
      target,
      targetAt: Dock.LEFT_BOTTOM
    });

    jest.spyOn(pc, 'tryCalc');

    expect(pc.targetAt).toEqual({ y: 'bottom', x: 'left' });

    const result = pc.calc();

    expect(pc.tryCalc).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      moveBy: { y: 0, x: 0 },
      distance: { top: 0, left: 0, bottom: 0, right: 0, overflow: null },
      mainAt: 'top left',
      targetAt: 'bottom left',
      pos: { top: 0, left: 0, height: 0, width: 0 }
    });

    pc.mainRect = null;
    expect(pc.calc()).toBeNull();
  });

  test('calculation', () => {
    // flip and stick
    let pc = new PositionCalculator({
      main,
      target,
      targetAt: Dock.BOTTOM_LEFT,
      flip: true,
      stick: true
    });

    jest.spyOn(pc, 'tryCalc');
    jest.spyOn(pc, '_overflowLT');
    jest.spyOn(pc, 'doFlip');

    let result;
    pc.tryCalc.mockImplementation(() => cloneDeep(stepResults[0]));

    pc.targetRect = null;
    result = pc.calc();
    expect(result).toEqual(finalResults[0]);

    pc.targetRect = pc.getRect(target);
    result = pc.calc();
    expect(result).toEqual(finalResults[0]);

    pc.doFlip.mockImplementationOnce(() => null);
    result = pc.calc();
    expect(result).toEqual(finalResults[0]);

    pc.tryCalc.mockImplementationOnce(() => cloneDeep(stepResults[0]))
              .mockImplementationOnce(() => cloneDeep(stepResults[1]));

    result = pc.calc();
    expect(result).toEqual(finalResults[1]);

    pc.tryCalc.mockImplementationOnce(() => cloneDeep(stepResults[0]))
              .mockImplementationOnce(() => cloneDeep(stepResults[0]))
              .mockImplementationOnce(() => cloneDeep(stepResults[1]));

    pc._overflowLT.mockImplementationOnce(() => true)
                  .mockImplementationOnce(() => false);

    result = pc.calc();
    expect(result).toEqual(finalResults[1]);

    pc.tryCalc.mockImplementationOnce(() => cloneDeep(stepResults[0]))
              .mockImplementationOnce(() => cloneDeep(stepResults[0]))
              .mockImplementationOnce(() => cloneDeep(stepResults[0]));

    pc._overflowLT.mockImplementationOnce(() => false)
                  .mockImplementationOnce(() => true);
    result = pc.calc();
    expect(result).toEqual({ ...finalResults[0], fliped: true });

    pc._overflowLT.mockImplementationOnce(() => true)
                  .mockImplementationOnce(() => true);
    result = pc.calc();
    expect(result).toEqual({ ...finalResults[0], fliped: true });

    pc.options.stick = 'none';
    result = pc.calc();
    expect(result).toEqual(finalResults[2]);

    pc = new PositionCalculator({
      main,
      mainAt: Dock.LEFT_BOTTOM,
      target,
      targetAt: Dock.BOTTOM_LEFT,
      flip: true,
      stick: true
    });

    result = pc.tryCalc(pc.mainAt);
    expect(result).toEqual(finalResults[3]);

    result = pc.tryCalc(pc.mainAt, { x: 'right', y: 'top' });
    expect(result).toEqual(finalResults[4]);

    pc.position = { left: 10, top: 10 };
    pc.crossLine = true;
    result = pc.tryCalc(pc.mainAt, pc.targetAt);
    expect(result).toEqual(finalResults[5]);

    result = pc.tryCalc(pc.mainAt, { x: 'right', y: 'top' });
    expect(result).toEqual(finalResults[4]);
  });

  test('flip', () => {
    const pc = new PositionCalculator({
      main,
      target,
      targetAt: Dock.BOTTOM_LEFT,
      flip: true,
      stick: true
    });

    let distance = { overflow: ['top'] };

    let result = pc.doFlip(true, pc.mainAt, pc.targetAt, distance);
    expect(result).toEqual({
      mainAt: { y: 'bottom', x: 'left' },
      targetAt: { y: 'top', x: 'left' }
    });

    distance = { overflow: ['bottom'] };

    result = pc.doFlip(true, pc.mainAt, pc.targetAt, distance);
    expect(result).toEqual({
      mainAt: { y: 'bottom', x: 'left' },
      targetAt: { y: 'top', x: 'left' }
    });

    distance = { overflow: ['left'] };

    result = pc.doFlip(true, pc.mainAt, pc.targetAt, distance);
    expect(result).toEqual({
      mainAt: { y: 'top', x: 'right' },
      targetAt: { y: 'bottom', x: 'right' }
    });

    distance = { overflow: ['right'] };

    result = pc.doFlip(true, pc.mainAt, pc.targetAt, distance);
    expect(result).toEqual({
      mainAt: { y: 'top', x: 'right' },
      targetAt: { y: 'bottom', x: 'right' }
    });

    distance = { overflow: ['top', 'bottom'] };

    result = pc.doFlip(true, pc.mainAt, pc.targetAt, distance);
    expect(result).toEqual(null);

    distance = { overflow: ['left', 'right'] };

    result = pc.doFlip(true, pc.mainAt, pc.targetAt, distance);
    expect(result).toEqual(null);

    distance = { overflow: ['top'] };

    result = pc.doFlip(false, pc.mainAt, pc.targetAt, distance);
    expect(result).toEqual({
      mainAt: { y: 'top', x: 'left' },
      targetAt: { y: 'bottom', x: 'left' }
    });
  });

  test('stick', () => {
    const pc = new PositionCalculator({
      main,
      target,
      targetAt: Dock.BOTTOM_LEFT,
      flip: true,
      stick: true
    });

    const result = {
      moveBy: {
        y: 100,
        x: 100
      },
      distance: {
        top: -500,
        left: -200,
        bottom: -300,
        right: 1500,
        overflow: ['top', 'left']
      },
      mainAt: 'top left',
      targetAt: 'bottom left',
      pos: {
        top: 500,
        left: 200,
        height: 300,
        width: 250
      }
    };

    expect(pc.doStick(cloneDeep(result), 'top')).toEqual({
      moveBy: { y: -400, x: 100 },
      distance: { top: 0, left: -200, bottom: 200, right: 1500, overflow: null },
      mainAt: 'top left',
      targetAt: 'bottom left',
      pos: { top: 0, left: 200, height: 300, width: 250 }
    });

    expect(pc.doStick(cloneDeep(result), 'left')).toEqual({
      moveBy: { y: 100, x: -100 },
      distance: {
        top: -500,
        left: 0,
        bottom: -300,
        right: 1700,
        overflow: ['bottom']
      },
      mainAt: 'top left',
      targetAt: 'bottom left',
      pos: { top: 500, left: 0, height: 300, width: 250 }
    });

    expect(pc.doStick({ distance: { overflow: [] } }, 'all')).toEqual({
      distance: { overflow: [] }
    });

    expect(pc.doStick(cloneDeep({ ...result, distance: { overflow: ['other'] } }), 'all')).toEqual({
      moveBy: { y: 100, x: 100 },
      distance: {
        overflow: null
      },
      mainAt: 'top left',
      targetAt: 'bottom left',
      pos: { top: 500, left: 200, height: 300, width: 250 }
    });
  });

  test('inner functions', () => {
    const pc = new PositionCalculator({
      main,
      target,
      targetAt: Dock.BOTTOM_LEFT,
      flip: true,
      stick: true
    });

    expect(pc.getRect(document)).toEqual({
      width: 0, height: 0, top: 0, left: 0
    });

    expect(pc.getRect(window)).toEqual({
      width: 0, height: 0, top: 0, left: 0
    });

    expect(pc.getRect(new Event('click'))).toEqual({
      width: 0, height: 0, top: undefined, left: undefined
    });

    expect(pc.getRect(main)).toEqual({
      width: 0, height: 0, top: 0, left: 0
    });

    const pos = { top: 1, left: 1 };
    pc.refreshPos(main, pos);
    expect(pos).toEqual({ top: 0, left: 0 });
    pc.refreshBoundaryPos(main, pos);
    expect(pos).toEqual({ top: 0, left: 0 });

    expect(pc.getBoundary(document)).toEqual({
      width: 0, height: 0, top: 0, left: 0
    });

    expect(pc.getBoundary(window)).toEqual({
      width: 0, height: 0, top: 0, left: 0
    });

    expect(pc.getBoundary(main)).toEqual({
      width: 0, height: 0, top: 0, left: 0
    });

    expect(pc.parseOffset(
      { x: '50%', y: '50%', mirror: true },
      { height: 100, width: 100 }
    )).toEqual({ x: 50, y: 50, mirror: true });

    expect(pc.calcRefPoint(
      { width: 40, height: 100, top: 10, left: 20 },
      { x: 10, y: 10, mirror: true },
      { y: 'top', x: 'left' }
    )).toEqual({ top: 10, left: 10, middle: 60, center: 30, bottom: 90, right: 30 });

    expect(pc.calcRefPoint(
      { width: 40, height: 100, top: 10, left: 20 },
      { x: 10, y: 10, mirror: true },
      { y: 'bottom', x: 'right' }
    )).toEqual({ top: -10, left: -10, middle: 60, center: 30, bottom: 110, right: 50 });

    expect(pc.calcRefPoint(
      { width: 40, height: 100, top: 10, left: 20 },
      { x: 10, y: 10 },
    )).toEqual({ top: 10, left: 10, middle: 60, center: 30, bottom: 110, right: 50 });

    expect(pc.updateOverflow({ top: 1, left: 1, bottom: -1, right: -1 })).toEqual({
      top: 1,
      left: 1,
      bottom: -1,
      right: -1,
      overflow: ['top', 'left', 'bottom', 'right']
    });

    expect(pc.calcDistanceToBoundary({ top: 10, left: 10, width: 40, height: 100 })).toEqual({
      top: -10,
      left: -10,
      bottom: -110,
      right: -50,
      overflow: ['bottom', 'right']
    });

    const distanceA = {
      top: -100,
      left: -100,
      bottom: -100,
      right: -100,
      overflow: ['bottom', 'right']
    };

    const distanceB = {
      top: 100,
      left: 100,
      bottom: 100,
      right: 100,
      overflow: ['top', 'left']
    };

    expect(pc._overflowLT(distanceA, distanceB, true)).toBe(false);
    expect(pc._overflowLT(distanceA, distanceB, false)).toBe(false);
    expect(pc._overflowLT(distanceB, distanceA, true)).toBe(false);

    pc.updateRects();
    expect(pc.mainRect).toEqual({ left: 0, top: 0, width: 0, height: 0 });
    expect(pc.targetRect).toEqual({ left: 0, top: 0, width: 0, height: 0 });

    pc.position = { left: 10, top: 10 };
    pc.crossLine = false;
    pc.updateRects();
    expect(pc.targetRect).toEqual({ left: 10, top: 10, width: 2, height: 2 });

    jest.spyOn(pc, 'getRect');
    pc.getRect.mockImplementationOnce(() => pc.mainRect);
    pc.updateRects();
    expect(pc.mainRect).toEqual({ left: 0, top: 0, width: 0, height: 0 });
  });
});

