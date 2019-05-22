import isNil from 'lodash/isNil';
import isArrayLike from 'lodash/isArrayLike';
import forEach from 'lodash/forEach';

export function addClass(elem, className) {
  if (!className) return;

  const els = isArrayLike(elem) ? elem : [elem];

  forEach(els, (el) => {
    if (el.classList) {
      el.classList.add(className.split(' '));
    } else {
      el.className += ` ${className}`;
    }
  });
}

export function removeClass(elem, className) {
  if (!className) return;

  const els = isArrayLike(elem) ? elem : [elem];

  forEach(els, (el) => {
    if (el.classList) {
      el.classList.remove(className.split(' '));
    } else {
      el.className = el.className.replace(new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, 'gi'), ' ');
    }
  });
}

export function hasClass(elem, className) {
  if (elem.classList) {
    return elem.classList.contains(className);
  }

  return (elem.className.indexOf(className) >= 0);
}

export function isWindow(obj) {
  return obj != null && obj === obj.window;
}

const getSize = (elem, name) => {
  if (isWindow(elem)) {
    // $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
    return elem.document.documentElement[`client${name}`];
  }

  // Get document width or height
  if (elem.nodeType === 9) {
    const doc = elem.documentElement;

    // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
    // whichever is greatest
    return Math.max(
      elem.body[`scroll${name}`], doc[`scroll${name}`],
      elem.body[`offset${name}`], doc[`offset${name}`],
      doc[`client${name}`]
    );
  }

  return elem[`offset${name}`];
};

const getScrollOffset = (elem, name) => {
  const props = { scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset' };
  let win;
  if (isWindow(elem)) {
    win = elem;
  } else if (elem.nodeType === 9) {
    win = elem.defaultView;
  }

  return win ? win[props[name]] : elem[name];
};

export function outerWidth(elem) {
  return getSize(elem, 'Width');
}

export function outerHeight(elem) {
  return getSize(elem, 'Height');
}

export function scrollLeft(elem) {
  return getScrollOffset(elem, 'scrollLeft');
}

export function scrollTop(elem) {
  return getScrollOffset(elem, 'scrollTop');
}

export function offset(elem) {
  if (!elem) {
    return null;
  }

  // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
  // Support: IE <=11 only
  // Running getBoundingClientRect on a
  // disconnected node in IE throws an error
  if (!elem.getClientRects().length) {
    return { top: 0, left: 0 };
  }

  const rect = elem.getBoundingClientRect();

  const doc = elem.ownerDocument;
  const docElem = doc.documentElement;
  const win = doc.defaultView;

  return {
    top: (rect.top + win.pageYOffset) - docElem.clientTop,
    left: (rect.left + win.pageXOffset) - docElem.clientLeft
  };
}

export function calcScrollWidth() {
  // Create the measurement node
  const scrollDiv = document.createElement('div');
  scrollDiv.className = 'scrollbar-measure';
  document.body.appendChild(scrollDiv);

  // Get the scrollbar width
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

  // Delete the DIV
  document.body.removeChild(scrollDiv);

  return scrollbarWidth;
}

export function isPointInDOM(clientX, clientY, dom) {
  if (dom && !isNil(clientX) && !isNil(clientY)) {
    const rect = dom.getBoundingClientRect();
    const { top, bottom, left, right } = rect;
    return (clientX > left && clientX < right &&
      clientY > top && clientY < bottom);
  }

  return false;
}

export function findAncestor(elem, cls) {
  while (elem && !hasClass(elem, cls)) {
    elem = elem.parentElement;
  }
  return elem;
}
