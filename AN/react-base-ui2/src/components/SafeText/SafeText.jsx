import React from 'react';
import PropTypes from 'prop-types';
import { decodeHtmlStr } from '../../utils';

const supportedTextTags = ['span', 'div', 'li', 'label', 'p', 'button'];

export default class SafeText extends React.PureComponent {
  /** the name of the component */
  static displayName = 'SafeText';

  /**
   * Default Props of SafeText.
   */
  static defaultProps = {
    /**
     * @type {String}
     * @desc defined the unique id for usage of automation test
     */
    'data-qa-id': '',
    tagName: 'span',
    decode: true,
    dangerMode: false
  };

  static propTypes = {
    'data-qa-id': PropTypes.string,
    tagName: PropTypes.oneOf(supportedTextTags),
    decode: PropTypes.bool,
    dangerMode: PropTypes.bool
  }

  render() {
    const {
      text = '',
      tagName = 'span',
      decode,
      dangerMode,
      ...rest
    } = this.props;

    const Tag = `${tagName}`;
    const s = decode ? decodeHtmlStr(text) : text;
    const newProps = {
      ...rest
    };

    if (dangerMode) {
      newProps.dangerouslySetInnerHTML = { __html: s };
    }

    return (
      <Tag {...newProps}>
        {dangerMode ? null : s}
      </Tag>
    );
  }
}
