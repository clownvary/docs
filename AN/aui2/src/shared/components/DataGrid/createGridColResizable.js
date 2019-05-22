import isElement from 'lodash/isElement';
import isFunction from 'lodash/isFunction';
import isArray from 'lodash/isArray';
import throttle from 'lodash/throttle';
import { addClass, removeClass } from 'react-base-ui/lib/utils/dom';
import tryParseInt from 'react-base-ui/lib/utils/tryParseInt';

class GridColResizable {
  static defaults = {
    liveDrag: true,
    defaultMinWidth: 30,
    headerOnly: true,
    disabledColumns: [],
    onResizing: null,
    onResized: null,
    cssRuleMode: true,
    handleContainerParentClass: '',
    headerClass: 'aaui-table-header',
    headerCellClass: 'aaui-table-header-cell',
    bodyRowClass: 'aaui-table-row',
    bodyCellClass: 'aaui-table-body-cell'
  };

  constructor(domElmTable, options = {}) {
    this.options = { ...GridColResizable.defaults, ...options };
    this.domElmTable = domElmTable;

    this.onGripMouseDown = this.onGripMouseDown.bind(this);
    this.onMouseMove = throttle(this.onMouseMove.bind(this), 50);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);

    this.init();
  }

  init() {
    addClass(this.domElmTable, 'table-col-resizer');
    this.resizeClassBound = false;

    this.domElmHandleList = [];
    this.domElmTableTheadThList = [];
    this.tableWidth = this.domElmTable.offsetWidth;

    const { disabledColumns } = this.options;
    /* istanbul ignore next */
    this.disabledColumns = !isArray(disabledColumns) ? [] : disabledColumns;

    this.createGrips();
    window.onresize = this.onWindowResize;
  }

  createGrips() {
    const { headerClass, headerCellClass, handleContainerParentClass } = this.options;
    const thList = this.domElmTable.querySelectorAll(`${this.classSelector(headerClass)} ${this.classSelector(headerCellClass)}`);

    const domElmThList = [];
    this.domElmHandleContainer = this.domElmTable.previousSibling;
    const hasHandleContainer = this.domElmHandleContainer && this.domElmHandleContainer.className === 'col-resize-container';

    /* istanbul ignore else */
    if (!hasHandleContainer) {
      if (handleContainerParentClass) {
        const handleContainerParentNode =
          this.domElmTable.querySelector(this.classSelector(handleContainerParentClass));
        handleContainerParentNode.insertAdjacentHTML('afterbegin', '<div class="col-resize-container"/>');
        this.domElmHandleContainer = handleContainerParentNode.querySelector(this.classSelector('col-resize-container'));
      }
      if (!handleContainerParentClass || !this.domElmHandleContainer) {
        this.domElmTable.insertAdjacentHTML('beforebegin', '<div class="col-resize-container"/>');
        this.domElmHandleContainer = this.domElmTable.previousSibling;
      }
    } else {
      Array.prototype.push.apply(this.domElmHandleList, this.domElmHandleContainer.childNodes);
    }

    Array.prototype.push.apply(domElmThList, thList);
    this.thLength = domElmThList.length;
    this.lastThIndex = this.thLength - 1;

    domElmThList.forEach((domElmTh, index) => {
      const disabled = this.disabledColumns.indexOf(index) !== -1;
      let domElmHandle;
      /* istanbul ignore else */
      if (!hasHandleContainer) {
        this.domElmHandleContainer.insertAdjacentHTML('beforeend',
          `<div class="drag-handle">
            <i class="icon icon-caret-right"></i>
            <div class="col-resizer"></div>
            <i class="icon icon-caret-left"></i>
          </div>`
        );
        domElmHandle = this.domElmHandleContainer.lastChild;
      } else {
        domElmHandle = this.domElmHandleList[index];
      }

      if (index === this.lastThIndex && !hasHandleContainer) {
        addClass(domElmHandle, 'last-handle');
      }

      /* istanbul ignore else */
      if (!disabled && !hasHandleContainer) {
        domElmHandle.addEventListener('mousedown', this.onGripMouseDown);
      } else if (disabled && !hasHandleContainer) {
        addClass(domElmHandle, 'disabled-drag');
      }

      domElmHandle.index = index;
      domElmTh.w = domElmTh.offsetWidth;
      domElmTh.p = domElmTh.offsetWidth / this.tableWidth;

      !hasHandleContainer && this.domElmHandleList.push(domElmHandle);

      this.domElmTableTheadThList.push(domElmTh);
    });
    this.syncGrips();
  }

  changeGripsStickState(sticky, stickyStyle = {}) {
    const stuck = this.domElmHandleContainer.className.indexOf('col-resize-container-sticky') >= 0;
    if (sticky && !stuck) {
      this.domElmHandleContainer.className = ('col-resize-container col-resize-container-sticky');
    } else if (!sticky && stuck) {
      this.domElmHandleContainer.className = ('col-resize-container');
    }
    const { top, left } = stickyStyle;
    if (top || top === 0) {
      this.domElmHandleContainer.style.top = `${top}px`;
    }
    if (left || left === 0) {
      this.domElmHandleContainer.style.left = `${left}px`;
    }
  }

  bindResizeClass() {
    const { headerCellClass } = this.options;

    this.styleSheetTitle = 'datagrid-resize-sheet';
    const filteredSheets = Array.prototype.filter.call(document.styleSheets,
      styleSheet => styleSheet.title === this.styleSheetTitle);
    /* istanbul ignore if */
    if (filteredSheets.length > 0) {
      this.sheet = filteredSheets[0];
    } else {
      const sheet = document.createElement('style', { title: this.styleSheetTitle });
      sheet.title = this.styleSheetTitle;
      document.body.appendChild(sheet);
      this.sheet = Array.prototype.filter.call(document.styleSheets,
        styleSheet => styleSheet.title === this.styleSheetTitle)[0];
      /* istanbul ignore else */
      if (!this.sheet) {
        this.sheet = document.styleSheets[document.styleSheets.length - 1];
      }
    }

    this.domElmTableTheadThList.forEach((domElmTh, index) => {
      const disabled = this.disabledColumns.indexOf(index) !== -1;
      const selector = Array.prototype.reduce.call(domElmTh.classList, (acc, cur) => (cur === headerCellClass ? acc : `${acc}.${cur}`), '');
      if (!disabled) {
        this.sheet.insertRule(`${selector} { width: ${domElmTh.w}px !important }`, index);
      } else {
        this.sheet.insertRule(`${selector} {}`, index);
      }
    });

    this.resizeClassBound = true;
  }

  syncGrips() {
    const { headerOnly } = this.options;
    const resizableTheadIndexes = this.domElmTableTheadThList
      .map((domElmTh, index) => index)
      .filter(index => this.disabledColumns.indexOf(index) < 0);

    const resizeableTheadIndex = resizableTheadIndexes.length > 0 ? resizableTheadIndexes[0] : 0;
    const theadHeight = this.domElmTableTheadThList[resizeableTheadIndex].offsetHeight;

    let height;
    if (headerOnly) {
      height = theadHeight;
    } else {
      height = this.domElmTable.offsetHeight;
    }

    for (let i = 0; i < this.thLength; i += 1) {
      const domElmTh = this.domElmTableTheadThList[i];

      let left;
      if (i === 0) {
        left = domElmTh.offsetWidth;
      } else {
        const handleColLeft = this.domElmHandleList[i - 1].style.left;
        left = tryParseInt(handleColLeft) + domElmTh.offsetWidth;
      }

      this.domElmHandleList[i].style.left = `${left}px`;
      this.domElmHandleList[i].style.height = `${height}px`;
    }

    const domElmIconList = [];
    const domElemIcons = this.domElmHandleContainer.querySelectorAll('.col-resize-container .icon');
    Array.prototype.push.apply(domElmIconList, domElemIcons);

    const iconHeight = domElemIcons[resizeableTheadIndex * 2].offsetHeight;

    domElmIconList.forEach((el) => {
      const marginTopNumber = (theadHeight - iconHeight) / 2;
      el.style.marginTop = `${tryParseInt(marginTopNumber)}px`;
    });
  }

  onGripMouseDown(e) {
    e.preventDefault();
    const { index } = e.currentTarget;
    const domElmHandle = this.domElmHandleList[index];

    addClass(domElmHandle, 'active-drag');

    domElmHandle.initPageLeftX = e.pageX;
    domElmHandle.initLeft = tryParseInt(domElmHandle.style.left);
    domElmHandle.x = domElmHandle.initLeft;
    this.drag = domElmHandle;

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);

    this.domElmTableTheadThList.forEach((domElmTh, i) => {
      const disabled = this.disabledColumns.indexOf(i) !== -1;
      if (!disabled) {
        domElmTh.w = domElmTh.offsetWidth;
        domElmTh.p = domElmTh.offsetWidth / this.tableWidth;
      }
    });

    if (!this.resizeClassBound) {
      this.bindResizeClass();
    }

    return false;
  }

  onMouseMove(e) {
    e.preventDefault();
    if (!this.drag) {
      return false;
    }

    const { defaultMinWidth } = this.options;
    const index = this.drag.index;

    const minWidth = defaultMinWidth;
    const pageLeftX = e.pageX;
    let x = (pageLeftX - this.drag.initPageLeftX) + this.drag.initLeft;

    const min = index ? tryParseInt(this.domElmHandleList[index - 1].style.left)
      + minWidth : minWidth;

    const max = tryParseInt(this.domElmHandleList[index + 1].style.left)
      - minWidth;

    x = Math.max(min, Math.min(max, x));

    const inc = x - this.drag.initLeft;
    const domElmThNow = this.domElmTableTheadThList[index];
    const domElmThElmNext = this.domElmTableTheadThList[index + 1];

    const w = domElmThNow.w + inc;
    const w2 = domElmThElmNext.w - inc;
    const minWidthOne = tryParseInt(this.domElmTableTheadThList[index].getAttribute('data-min-width'));
    const minWidthTwo = tryParseInt(this.domElmTableTheadThList[index + 1].getAttribute('data-min-width'));

    /* istanbul ignore else */
    if (minWidthOne > w) {
      x = (minWidthOne - domElmThNow.w) + this.drag.initLeft;
    } else if (minWidthTwo > w2) {
      x = (domElmThElmNext.w - minWidthTwo) + this.drag.initLeft;
    }

    this.drag.x = x;
    this.drag.style.left = `${x}px`;

    if (this.options.liveDrag) {
      this.syncCols(index);
      this.syncGrips();
      const { onResizing } = this.options;

      isFunction(onResizing) && onResizing(e);
    }

    return false;
  }

  syncCols(i, isOver) {
    const inc = this.drag.x - this.drag.initLeft;
    const domElmThNow = this.domElmTableTheadThList[i];
    const domElmThNext = this.domElmTableTheadThList[i + 1];

    const w = domElmThNow.w + inc;
    const w2 = domElmThNext.w - inc;

    this.sheet.cssRules[i].style.setProperty('width', `${w}px`, 'important');
    this.sheet.cssRules[i + 1].style.setProperty('width', `${w2}px`, 'important');

    if (isOver) {
      domElmThNow.w = w;
      domElmThNext.w = w2;

      domElmThNow.p = w / this.tableWidth;
      domElmThNext.p = w2 / this.tableWidth;
    }
  }

  onMouseUp(e) {
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mousemove', this.onMouseMove);

    if (!this.drag) {
      return false;
    }

    removeClass(this.drag, 'active-drag');
    if (!(this.drag.x - this.drag.initLeft === 0)) {
      const index = this.drag.index;
      this.syncCols(index, true);
      this.syncGrips();

      const { onResized } = this.options;
      isFunction(onResized) && onResized(e);
    }
    this.drag = null;

    return true;
  }

  classSelector = classname => `.${classname}`;

  onWindowResize() {
    /* istanbul ignore else */
    if (this.domElmTable) {
      this.tableWidth = this.domElmTable.offsetWidth;

      if (this.resizeClassBound) {
        this.domElmTableTheadThList.forEach((domElmTh, index) => {
          const disabled = this.disabledColumns.indexOf(index) !== -1;
          if (!disabled) {
            const resizeWidth = domElmTh.p * this.tableWidth;
            const minWidth = domElmTh.getAttribute('data-min-width');
            const finalWidth = tryParseInt(resizeWidth < minWidth ? minWidth : resizeWidth);
            this.sheet.cssRules[index].style.setProperty('width', `${finalWidth}px`, 'important');
            domElmTh.w = finalWidth;
          }
        });
      }
      this.syncGrips();
    }
  }
}

const createColResizable = (domEleTable, options) => {
  if (isElement(domEleTable)) {
    if (!domEleTable.__resizable) {
      domEleTable.__resizable = new GridColResizable(domEleTable, options);
    }
    return domEleTable.__resizable;
  }

  return null;
};

export default createColResizable;
