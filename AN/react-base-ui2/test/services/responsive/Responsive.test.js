import { Responsive } from 'src/services/responsive';
import * as RangeName from 'src/services/responsive/consts/RangeName';

describe('services/responsive/Responsive', () => {
  test('basic usage', () => {
    const r = Responsive.getInstance();
    expect(r.isLg()).toBe(false);
    expect(r.isMd()).toBe(false);
    expect(r.isSm()).toBe(true);

    expect(r.getOrientation()).toBe('');

    window.orientation = 180;
    expect(r.getOrientation()).toBe('portrait');

    window.orientation = -90;
    expect(r.getOrientation()).toBe('landscape');

    window.orientation = 45;
    expect(r.getOrientation()).toBe('');

    const handleChangeSpy = jest.spyOn(r, 'handleChange');
    r.onOrientationChange();
    expect(handleChangeSpy).toBeCalledWith('orientationchange', true);

    r.onResize();
    expect(handleChangeSpy).toBeCalledWith('resize');

    const getRangeNameSpy = jest.spyOn(r, 'getRangeName');
    r.handleChange();
    expect(getRangeNameSpy).toBeCalled();

    const getScreenWidthSpy = jest.spyOn(r, 'getScreenWidth');
    getScreenWidthSpy.mockImplementationOnce(() => 1000);
    expect(r.getRangeName()).toBe('lg');

    getScreenWidthSpy.mockImplementationOnce(() => 800);
    expect(r.getRangeName()).toBe('md');

    const emmiterOnSpy = jest.spyOn(r.emitter, 'on');
    const emmiterOffSpy = jest.spyOn(r.emitter, 'off');

    r.addEventListener('test');
    expect(emmiterOnSpy).toHaveBeenCalledTimes(1);
    r.removeEventListener('test');
    expect(emmiterOffSpy).toHaveBeenCalledTimes(1);

    r.setConfig();

    expect(r.getConfig().rangeNames).toEqual([
      RangeName.SCREEN_LARGE,
      RangeName.SCREEN_MEDIUM,
      RangeName.SCREEN_SMALL
    ]);

    r.setConfig({ rangeNames: [RangeName.SCREEN_LARGE] });

    expect(r.getConfig().rangeNames).toEqual([
      RangeName.SCREEN_LARGE,
      RangeName.SCREEN_MEDIUM,
      RangeName.SCREEN_SMALL
    ]);
  });
});
