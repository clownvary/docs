import React, { Component } from 'react';
import { bool, oneOfType, number } from 'prop-types';
import textTruncation from './createTruncationHOC';

/* eslint-disable  react/no-unused-prop-types */
const CharsTruncationPropTypes = {
  /**
   * Specifies how many characters of text should be preserved until it gets truncated.
   * false and any integer < 1 will result in the text not getting clipped at all.
   */
  length: oneOfType([number, bool])
};

const CharsTruncationProps = {
  length: 100
};

/* istanbul ignore next */
class CharsTruncation extends Component {
  static displayName = 'CharsTruncation';
  static propTypes = CharsTruncationPropTypes;
  static defaultProps = CharsTruncationProps;

  render() {
    return <div className="an-truncation an-truncation-chars">{this.props.children}</div>;
  }
}

/* istanbul ignore next */
export default textTruncation(CharsTruncation, (props) => {
  const charsTruncationProps = { ...CharsTruncationProps, ...props };
  const { length, text } = charsTruncationProps;

  let childText = text;

  if (childText.length > length) {
    childText = text.substring(0, length);
  }

  return childText;
});

