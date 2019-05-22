import isString from 'lodash/isString';
import isElement from 'lodash/isElement';
import isFunction from 'lodash/isFunction';
import throttle from 'lodash/throttle';
import forEach from 'lodash/forEach';
import findIndex from 'lodash/findIndex';

import { addClass, removeClass, hasClass } from '../../../utils/dom';

import './selectScroll.less';

const defaultOptions = {
  selectableClass: '',
  deSelectableClasses: [],
  enabled: true,
  scrollContainer: null,
  scrollSensitiveDistance: 30,
  scrollVertical: 30,
  scrollHorizontal: 50,
  scrollThrottleTime: 80,
  highlightThrottleTime: 80,
  onStart: null,
  onEnd: null
};

const numberSorter = (a, b) => a - b;

class SelectScroll {
  static tag = 'an-rc__select-scroller';
  static selectionBoxId = 'an-rc__selection';
  static selectingClass = 'an-rc__no-select';
  static highlightClass = 'grid-cell__selected';

  constructor(el, options) {
    this.element = isString(el) ? document.querySelector(el) : el;

    if (!this.element || !isElement(this.element)) {
      throw new Error('Invalid target element');
    }

    this.options = { ...defaultOptions, ...options };
    this.on = false;

    this.preStartCheck = this.preStartCheck.bind(this);
    this.preStartCache = this.preStartCache.bind(this);
    this.start = this.start.bind(this);
    this.end = this.end.bind(this);
    this.getRectBox = this.getRectBox.bind(this);
    this.drawRectRelative = this.drawRectRelative.bind(this);
    this.bindSelectingEventListeners = this.bindSelectingEventListeners.bind(this);
    this.cleanSelectingEventListeners = this.cleanSelectingEventListeners.bind(this);

    this.getRowRectIndexByPoint = this.getRowRectIndexByPoint.bind(this);
    this.getColumnRectIndexByPoint = this.getColumnRectIndexByPoint.bind(this);

    this.scroll = throttle(this.scroll, this.options.scrollThrottleTime).bind(this);
    this.highlightSelections =
      throttle(this.highlightSelections, this.options.highlightThrottleTime).bind(this);

    this.options.enabled && this.enable();
  }

  getRectBox = () => {
    if (!this.rectBox) {
      this.rectBox = document.getElementById(SelectScroll.selectionBoxId);
    }

    if (!this.rectBox) {
      const rb = document.createElement('div');
      rb.id = SelectScroll.selectionBoxId;

      const { scrollContainer } = this.options;
      /* istanbul ignore next */
      scrollContainer.firstChild ?
        scrollContainer.insertBefore(rb, scrollContainer.firstChild) :
        scrollContainer.appendChild(rb);

      this.rectBox = rb;
    }

    return this.rectBox;
  };

  cleanRectBox() {
    if (this.rectBox && this.rectBox.parentNode) {
      this.rectBox.parentNode.removeChild(this.rectBox);
    }
    this.rectBox = null;
  }

  preStartCheck = (currentTarget) => {
    const { selectableClass, deSelectableClasses } = this.options;

    // Fix: The drag and drop should only happened in the blank space rather than on the events
    if (deSelectableClasses.length > 0) {
      let target = currentTarget;
      const isDragInTheDeSelectableElements = ele =>
        deSelectableClasses.some(cls => hasClass(ele, cls));

      while (target && this.element.contains(target)) {
        if (isDragInTheDeSelectableElements(target)) {
          return false;
        }

        target = target.parentNode;
      }
    }

    if (selectableClass) {
      let target = currentTarget;
      while (target && !hasClass(target, selectableClass)) {
        target = target.parentNode;
      }
      if (!target) {
        return false;
      }
    }

    return true;
  };

  preStartCache = ({ pageX, pageY }) => {
    const { scrollContainer } = this.options;

    this.ipos = [pageX, pageY];
    this.scrollPos = [scrollContainer.scrollLeft, scrollContainer.scrollTop];

    // cache container
    this.containerRect = scrollContainer.getBoundingClientRect();

    // cache cells dom by row/column
    const rowCells = [];
    const rows = document.querySelectorAll('.an-scroller__content .grid-row');
    forEach(rows, (row, index) => {
      rowCells[index] = row.querySelectorAll('.grid-cell');
    });
    this.rowCells = rowCells;

    // cache first row/column related rect
    const rowRect = [];
    forEach(rowCells, (row, rowIndex) => {
      const rect = row[0].getBoundingClientRect();
      rowRect[rowIndex] = {
        top: rect.top,
        bottom: rect.bottom
      };
    });
    this.rowRect = rowRect;

    const columnRect = [];
    forEach(rowCells[0], (cell, cellIndex) => {
      const rect = cell.getBoundingClientRect();
      columnRect[cellIndex] = {
        left: rect.left,
        right: rect.right
      };
    });
    this.columnRect = columnRect;

    // indexes of the cell that selection start from
    this.startRowIndex = this.getRowRectIndexByPoint({ top: this.ipos[1] });
    this.startColumnIndex = this.getColumnRectIndexByPoint({ left: this.ipos[0] });

    this.highlightIndexes = [];
  };

  start = (e) => {
    const {
      scrollContainer, onStart
    } = this.options;
    if (!this.preStartCheck(e.target)) {
      return false;
    }
    this.preStartCache(e);

    isFunction(onStart) && onStart(e, this.rowCells[this.startRowIndex][this.startColumnIndex]);

    this.cleanSelectingEventListeners();
    this.bindSelectingEventListeners();

    addClass(scrollContainer, SelectScroll.selectingClass);
    return true;
  };

  highlightSelections = (e, g) => {
    /* istanbul ignore next */
    if (!this.ipos) return;

    const { scrollContainer } = this.options;

    const { pageX, pageY } = e;
    const { left, top, right, bottom } = g.getBoundingClientRect();

    // mouse current position
    const scrollLeftDiff = scrollContainer.scrollLeft - this.scrollPos[0];
    const scrollTopDiff = scrollContainer.scrollTop - this.scrollPos[1];

    // get rect box end position
    const endRowIndex = this.getRowRectIndexByPoint({
      top: (this.ipos[1] < pageY + scrollTopDiff ? bottom : top) + scrollTopDiff
    });
    this.endRowIndex = endRowIndex;
    const endColumnIndex = this.getColumnRectIndexByPoint({
      left: (this.ipos[0] < pageX + scrollLeftDiff ? right : left) + scrollLeftDiff
    });
    this.endColumnIndex = endColumnIndex;

    const [rowIndex1, rowIndex2] = [this.startRowIndex, endRowIndex].sort(numberSorter);
    const [columnIndex1, columnIndex2] = [this.startColumnIndex, endColumnIndex].sort(numberSorter);

    // next round highlight cell row/column index
    const nextHighlightIndexes = [];
    for (let ri = rowIndex1; ri <= rowIndex2; ri += 1) {
      for (let ci = columnIndex1; ci <= columnIndex2; ci += 1) {
        nextHighlightIndexes.push({
          row: ri,
          col: ci
        });
      }
    }

    // next shall be highlight
    const highlightDiff = nextHighlightIndexes.filter(item =>
      !this.highlightIndexes.some(before => before.row === item.row && before.col === item.col));

    // next shall be recover to normal
    const recoverDiff = this.highlightIndexes.filter(before =>
      !nextHighlightIndexes.some(item => before.row === item.row && before.col === item.col));

    // apply class change
    highlightDiff.forEach((item) => {
      this.rowCells[item.row][item.col].classList.add(SelectScroll.highlightClass);
    });
    recoverDiff.forEach((item) => {
      this.rowCells[item.row][item.col].classList.remove(SelectScroll.highlightClass);
    });

    // update highlight cell index cache
    this.highlightIndexes = nextHighlightIndexes;
  };

  drawRectRelative = (e) => {
    /* istanbul ignore next */
    if (!this.ipos) return;

    const g = this.getRectBox();
    /* istanbul ignore next */
    if (!g) return;

    const { scrollContainer } = this.options;

    const { pageX, pageY } = e;

    // base on the scroll position to compare the mouse position
    let x1 = this.ipos[0] + this.scrollPos[0];
    let y1 = this.ipos[1] + this.scrollPos[1];
    let x2 = pageX + scrollContainer.scrollLeft;
    let y2 = pageY + scrollContainer.scrollTop;

    [x1, x2] = [x1, x2].sort(numberSorter);
    [y1, y2] = [y1, y2].sort(numberSorter);

    let left = x1 - this.containerRect.left;
    // not out of bounds
    left = Math.max(left, 0);
    // not out of bounds when scrolling
    if (scrollContainer.scrollLeft < this.scrollPos[0] && left < scrollContainer.scrollLeft) {
      left = scrollContainer.scrollLeft;
    }

    let top = y1 - this.containerRect.top;
    top = Math.max(top, 0);
    if (scrollContainer.scrollTop < this.scrollPos[1] && top < scrollContainer.scrollTop) {
      top = scrollContainer.scrollTop;
    }

    let width = x2 - x1;
    width = Math.min(width, scrollContainer.scrollWidth - left);
    if (scrollContainer.scrollLeft > this.scrollPos[0] &&
      scrollContainer.scrollLeft + scrollContainer.clientWidth < left + width) {
      width = (scrollContainer.scrollLeft + scrollContainer.clientWidth) - left;
    }
    if (left === 0) {
      width = (this.ipos[0] - this.containerRect.left) + this.scrollPos[0];
    }

    let height = y2 - y1;
    height = Math.min(height, scrollContainer.scrollHeight - top);
    if (scrollContainer.scrollTop > this.scrollPos[1] &&
      scrollContainer.scrollTop + scrollContainer.clientHeight < top + height) {
      height = (scrollContainer.scrollTop + scrollContainer.clientHeight) - top;
    }
    if (top === 0) {
      height = (this.ipos[1] - this.containerRect.top) + this.scrollPos[1];
    }

    // +/- 1px to resolve mouseup event target issue
    g.style.left = `${left + 1}px`;
    g.style.top = `${top + 1}px`;
    g.style.width = `${width - 1}px`;
    g.style.height = `${height - 1}px`;

    // highlight cell selection
    this.highlightSelections(e, g);
  };

  getRowRectIndexByPoint = point => findIndex(this.rowRect, (rect, index) => {
    if (index === 0) {
      return rect.bottom >= point.top;
    }
    if (index === this.rowRect.length - 1) {
      return rect.top <= point.top;
    }
    return rect.top <= point.top && rect.bottom >= point.top;
  });

  getColumnRectIndexByPoint = point => findIndex(this.columnRect, (rect, index) => {
    if (index === 0) {
      return rect.right >= point.left;
    }
    if (index === this.columnRect.length - 1) {
      return rect.left <= point.left;
    }
    return rect.left <= point.left && rect.right >= point.left;
  });

  scroll = (e) => {
    /* istanbul ignore next */
    if (!this.ipos) return;

    const { pageX, pageY } = e;
    const {
      scrollContainer, scrollSensitiveDistance, scrollVertical, scrollHorizontal
    } = this.options;
    // check meet the boundary
    const rect = this.containerRect;

    const {
      scrollLeft, scrollTop, scrollWidth, scrollHeight, clientWidth,
      clientHeight
    } = scrollContainer;

    if (scrollTop > 0) {
      const meetTopBoundary = pageY <= rect.top + scrollSensitiveDistance;
      if (meetTopBoundary) {
        const nextScrollTop = scrollTop - scrollVertical;
        scrollContainer.scrollTop = nextScrollTop < 0 ? 0 : nextScrollTop;
      }
    }

    const maxScrollLeft = scrollWidth - clientWidth;
    if (scrollLeft < maxScrollLeft) {
      const meetRightBoundary = pageX >= rect.right - scrollSensitiveDistance;
      if (meetRightBoundary) {
        const nextScrollLeft = scrollLeft + scrollHorizontal;
        scrollContainer.scrollLeft = nextScrollLeft > maxScrollLeft ?
          maxScrollLeft : nextScrollLeft;
      }
    }

    const maxScrollTop = scrollHeight - clientHeight;
    if (scrollTop < maxScrollTop) {
      const meetBottomBoundary = pageY >= rect.bottom - scrollSensitiveDistance;
      if (meetBottomBoundary) {
        const nextScrollTop = scrollTop + scrollVertical;
        scrollContainer.scrollTop = nextScrollTop > maxScrollTop ? maxScrollTop : nextScrollTop;
      }
    }

    if (scrollLeft > 0) {
      const meetLeftBoundary = pageX <= rect.left + scrollSensitiveDistance;
      if (meetLeftBoundary) {
        const nextScrollLeft = scrollLeft - scrollHorizontal;
        scrollContainer.scrollLeft = nextScrollLeft < 0 ? 0 : nextScrollLeft;
      }
    }

    // make sure draw rect called after last throttled scroll
    this.drawRectRelative(e);
  };

  end = (e) => {
    removeClass(this.options.scrollContainer, SelectScroll.selectingClass);

    // make sure the event listeners be removed firstly
    this.cleanSelectingEventListeners();

    /* istanbul ignore next */
    if (!this.ipos) return;

    const ipos = this.ipos;
    delete (this.ipos);

    forEach(this.rowCells, (row) => {
      row && forEach(row, (cell) => {
        cell.classList.remove(SelectScroll.highlightClass);
      });
    });

    this.scrollPos = null;
    this.rowRect = null;
    this.columnRect = null;
    this.highlightIndexes = null;

    /* istanbul ignore next */
    if (ipos[0] === e.pageX && ipos[1] === e.pageY) {
      this.cleanRectBox();
      return;
    }
    const g = this.getRectBox();
    /* istanbul ignore next */
    if (!g) return;
    this.cleanRectBox();

    this.options.onEnd &&
    this.options.onEnd(e, this.rowCells[this.endRowIndex][this.endColumnIndex]);

    this.rowCells = null;
  };

  enable = () => {
    if (this.on) {
      throw new Error('Already enabled');
    }

    this.disable();
    this.element.addEventListener('mousedown', this.start);
    this.on = true;
  };

  disable = () => {
    this.element.removeEventListener('mousedown', this.start);
    this.on = false;
  };

  bindSelectingEventListeners = () => {
    document.addEventListener('mousemove', this.drawRectRelative);
    document.addEventListener('mousemove', this.scroll);
    document.addEventListener('mouseup', this.end, true);
  };

  cleanSelectingEventListeners = () => {
    document.removeEventListener('mousemove', this.drawRectRelative);
    document.removeEventListener('mousemove', this.scroll);
    document.removeEventListener('mouseup', this.end, true);
  }
}

export default SelectScroll;
