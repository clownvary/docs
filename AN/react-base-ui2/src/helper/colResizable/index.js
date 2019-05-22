import isElement from 'lodash/isElement';
import ColResizable from './resizeable';

const createColResizable = (domEleTable, options) => {
  if (isElement(domEleTable) && domEleTable.nodeName === 'TABLE') {
    return domEleTable.__resizable ||
      (domEleTable.__resizable = new ColResizable(domEleTable, options));
  }

  return null;
};

export default createColResizable;
