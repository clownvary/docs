import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isString from 'lodash/isString';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';

import { LinesTruncation, CharsTruncation } from 'shared/components/Truncation';
import { LINE, CHAR } from './truncationType';

import './index.less';

class Paragraph extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    align: PropTypes.oneOf(['left', 'center', 'right']),
    preLineWrap: PropTypes.bool,
    ellipsis: PropTypes.string,
    truncateType: PropTypes.oneOf([LINE, CHAR]),
    truncateValue: PropTypes.number,
    expandRender: PropTypes.func,
    pictureFloat: PropTypes.oneOf(['left', 'right']),
    picture: PropTypes.string,
    pictureAlt: PropTypes.string
  };

  static defaultProps = {
    align: 'left',
    pictureFloat: 'left',
    ellipsis: '...',
    preLineWrap: true
  };

  render() {
    const {
      className, children, truncateType, truncateValue, align, preLineWrap,
      picture, pictureFloat, pictureAlt, ...rest
    } = this.props;
    const textClassname = classNames(`u-text-${align}`, { 'u-text-pre-line': preLineWrap });
    const noTruncate = !truncateType;
    const lineTruncate = truncateType === LINE;
    const charTruncate = truncateType === CHAR;
    const text = isString(children) ? decodeHtmlStr(children) : children;
    return (
      <div className={classNames('an-paragraph', className)}>
        {
          picture &&
          <img
            src={picture}
            className={classNames('an-paragraph-img', `u-float-${pictureFloat}`)}
            alt={pictureAlt}
          />
        }
        {
          noTruncate &&
          <span className={textClassname}>
            {text}
          </span>
        }
        {
          lineTruncate &&
          <LinesTruncation
            className={textClassname}
            expandAlign="left"
            lines={truncateValue}
            text={text}
            {...rest}
          />
        }
        {
          charTruncate &&
          <CharsTruncation
            className={textClassname}
            expandAlign="left"
            length={truncateValue}
            text={text}
            {...rest}
          />
        }
      </div>
    );
  }
}

export default Paragraph;
