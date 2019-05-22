import React, { Component } from 'react';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import { bool, oneOfType, number } from 'prop-types';
import textTruncation from './createTruncationHOC';

/* eslint-disable  react/no-unused-prop-types */
const LinesTruncationPropTypes = {
  /**
   * Specifies how many lines of text should be preserved until it gets truncated.
   * false and any integer < 1 will result in the text not getting clipped at all.
   */
  lines: oneOfType([number, bool])
};

const LinesTruncationProps = {
  lines: 3
};

/* istanbul ignore next */
class LinesTruncation extends Component {
  static displayName = 'LinesTruncation';
  static propTypes = LinesTruncationPropTypes;
  static defaultProps = LinesTruncationProps;

  render() {
    const { className, children } = this.props;
    return (
      <div className={classNames('an-truncation', 'an-truncation-lines', className)}>
        {this.props.children}
      </div>
    );
  }
}

/* istanbul ignore next */
const getDOMNodeProperty = (node, property) =>
  document.defaultView.getComputedStyle(node, null)
    .getPropertyValue(property);

/* istanbul ignore next */
const getLineHeight = (node) => {
  let lineHeight = getDOMNodeProperty(node, 'line-height');
  const specificLineHeight = 'normal|initial|inherit';

  if (specificLineHeight.indexOf(lineHeight) > -1) {
    lineHeight = parseInt(getDOMNodeProperty(node, 'font-size'), 10) * 1.25;
  }

  return parseInt(lineHeight, 10);
};

/* istanbul ignore next */
const truncateTextByHeight = (linesTruncationProps, textRef, ellipsis) => {
  const { lines, text } = linesTruncationProps;
  const node = findDOMNode(textRef);
  const lineHeight = getLineHeight(node);
  let height = parseInt(getDOMNodeProperty(node, 'height'), 10);
  let numberOfLines = height / lineHeight;
  const textToSearch = ' '; // Do not break word
  let childText = text;

  if (isNaN(numberOfLines)) {
    throw new Error(`Can't get the right lines of the text. height : ${height}, line height : ${lineHeight}`);
  }

  if (numberOfLines > lines) {
    const cloneNode = node.cloneNode(true);

    cloneNode.className += 'u-invisible';
    node.insertAdjacentElement('beforeBegin', cloneNode);
    const truncatedElement = cloneNode;

    if (!truncatedElement) {
      throw new Error('Please assign a class name to the truncated element.');
    }
    truncatedElement.innerHTML = childText;

    while (numberOfLines > lines) {
      const truncatedText = childText.substring(0, childText.lastIndexOf(textToSearch));
      truncatedElement.innerHTML = truncatedText + ellipsis;
      childText = truncatedText;
      height = getDOMNodeProperty(cloneNode, 'height').replace('px', '');
      numberOfLines = height / lineHeight;
    }
    cloneNode.parentNode.removeChild(cloneNode);
  }

  return childText;
};

// Won't cause the re-render of the page elements
/* istanbul ignore next */
const truncateTextByDomRange = (linesTruncationProps, textRef, ellipsis) => {
  const node = findDOMNode(textRef);
  const { lines, text } = linesTruncationProps;
  const range = document.createRange();
  const lineHeight = getLineHeight(node);
  const nodeTop = node.getBoundingClientRect().top;
  const nodePaddingTop = parseInt(getDOMNodeProperty(node, 'padding-top'), 10);
  const nodeBorderTop = parseInt(getDOMNodeProperty(node, 'border-top-width'), 10);
  const nodePaddingBottom = parseInt(getDOMNodeProperty(node, 'padding-bottom'), 10);
  const nodeBorderBottom = parseInt(getDOMNodeProperty(node, 'border-bottom-width'), 10);
  const halfLineHeight = lineHeight / 2;
  const textToSearch = ' ';
  const maxNodeHeight = lineHeight * lines;
  const maxNodeBottom = nodeTop + nodeBorderTop + nodePaddingTop +
    maxNodeHeight + halfLineHeight + nodePaddingBottom + nodeBorderBottom;
  const ellipsisLength = ellipsis.length;
  const rangeDom = node.querySelector('.an-truncation-text').childNodes[0];
  let childText = text;
  let rangeBottom = 0;

  range.selectNodeContents(rangeDom);
  range.setStart(rangeDom, 0);
  range.setEnd(rangeDom, childText.length);
  rangeBottom = range.getBoundingClientRect().bottom;

  while (rangeBottom > maxNodeBottom) {
    const truncatedText = childText.substring(0, childText.lastIndexOf(textToSearch));
    range.setEnd(rangeDom, truncatedText.length);
    childText = truncatedText;
    rangeBottom = range.getBoundingClientRect().bottom;
  }

  if (childText !== text) {
    const rangeEndIndex = childText.length + ellipsisLength;
    const lastTextIndex = text.length;
    range.setEnd(rangeDom, lastTextIndex > rangeEndIndex ? rangeEndIndex : lastTextIndex);
    rangeBottom = range.getBoundingClientRect().bottom;

    while (rangeBottom > maxNodeBottom) {
      const truncatedText = childText.substring(0, childText.lastIndexOf(textToSearch));
      const tempRangeEndIndex = truncatedText.length + ellipsisLength + 2;
      range.setEnd(rangeDom, lastTextIndex > tempRangeEndIndex ? tempRangeEndIndex : lastTextIndex);
      childText = truncatedText;
      rangeBottom = range.getBoundingClientRect().bottom;
    }
  }

  return childText;
};

/* istanbul ignore next */
export default textTruncation(LinesTruncation, (props, textRef, ellipsis) => {
  const linesTruncationProps = { ...LinesTruncationProps, ...props };
  const supportsDOMRanges = document.implementation && document.implementation.hasFeature && document.implementation.hasFeature('Range', '2.0');
  let childText = '';

  if (supportsDOMRanges) {
    childText = truncateTextByDomRange(linesTruncationProps, textRef, ellipsis);
  } else {
    childText = truncateTextByHeight(linesTruncationProps, textRef, ellipsis);
  }

  return childText;
});
