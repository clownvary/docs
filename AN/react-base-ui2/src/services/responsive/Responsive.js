import throttle from 'lodash/throttle';
import forEach from 'lodash/forEach';
import isNil from 'lodash/isNil';
import { outerWidth } from '../../utils/dom';
import Browser from '../../utils/browser';
import * as Orientation from '../../consts/Orientation';
import EventEmitter from '../../common/EventEmitter';
import * as RangeName from './consts/RangeName';

const defaultBreakpoints = [960, 768];
const defaultRangeNames = [
  RangeName.SCREEN_LARGE,
  RangeName.SCREEN_MEDIUM,
  RangeName.SCREEN_SMALL
];

export default class Responsive {

  static instance = null;

  static getInstance() {
    if (!Responsive.instance) {
      Responsive.instance = new Responsive();
    }
    return Responsive.instance;
  }

  constructor() {
    this.config = {
      rangeNames: defaultRangeNames,
      breakpoints: defaultBreakpoints
    };
    this.emitter = new EventEmitter('responsive~');
    window.addEventListener('resize', throttle(this.onResize.bind(this), 300));
    window.addEventListener('orientationchange', this.onOrientationChange.bind(this));
  }

  isLg() {
    return this.getRangeName() === RangeName.SCREEN_LARGE;
  }

  isMd() {
    return this.getRangeName() === RangeName.SCREEN_MEDIUM;
  }

  isSm() {
    return this.getRangeName() === RangeName.SCREEN_SMALL;
  }

  getOrientation() {
    let orientation = '';
    if (!isNil(window.orientation)) {
      if (window.orientation === 0 || window.orientation === 180) { // Landscape Mode
        /* istanbul ignore next */
        orientation = Browser.android ? Orientation.LANDSCAPE : Orientation.PORTRAIT;
      } else if (window.orientation === 90 || window.orientation === -90) { // Portrait Mode
        /* istanbul ignore next */
        orientation = Browser.android ? Orientation.PORTRAIT : Orientation.LANDSCAPE;
      }
    }

    return orientation;
  }

  _getState() {
    return {
      orientation: this.getOrientation(),
      rangeName: this.getRangeName(),
      screenWidth: this.getScreenWidth(),
      isLg: this.isLg(),
      isMd: this.isMd(),
      isSm: this.isSm()
    };
  }

  onOrientationChange() {
    this.handleChange('orientationchange', true);
  }

  onResize() {
    this.handleChange('resize');
  }

  handleChange(event = 'resize', force = false) {
    const rangeName = this.getRangeName();

    if (force || this.rangeName !== rangeName) {
      this.rangeName = rangeName;
      this.emitter.emit(event, {
        ...this._getState()
      });
    }
  }

  getRangeName() {
    const { rangeNames, breakpoints } = this.config;
    const screenWidth = this.getScreenWidth();
    const length = breakpoints.length;
    let name = rangeNames[0];

    forEach(breakpoints, (value, i) => {
      if (screenWidth >= breakpoints[i + 1] && screenWidth < value) {
        name = rangeNames[i + 1];
      } else if (screenWidth < breakpoints[length - 1]) {
        name = rangeNames[length];
      } else if (screenWidth > breakpoints[0]) {
        name = rangeNames[0];
      }
    });
    return name;
  }

  getScreenWidth() {
    return outerWidth(window);
  }

  // supports two events: resize and orientationchange
  addEventListener(event, ...args) {
    this.emitter.on(event, ...args);
  }

  removeEventListener(event, ...args) {
    this.emitter.off(event, ...args);
  }

  setConfig(config) {
    config = config || {};
    config.rangeNames = config.rangeNames || defaultRangeNames;
    config.breakpoints = config.breakpoints || defaultBreakpoints;
    if (config.rangeNames.length - config.breakpoints.length === 1) {
      this.config = config;
      this.handleChange('resize', true);
    }
  }

  getConfig() {
    return this.config;
  }
}
