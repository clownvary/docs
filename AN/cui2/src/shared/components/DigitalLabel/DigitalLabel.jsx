import React from 'react';
import {
  string, number, bool,
  node, oneOf, oneOfType
} from 'prop-types';
import cn from 'classnames';
import { FormattedNumber } from 'shared/translation/formatted';
import Text from '../Text';

import './index.less';

const _propTypes = {
  bold: bool,
  value: oneOfType([string, number]),
  className: string,
  size: oneOf(['xs', 's', 'm', 'l', 'xl']),
  digitalStyle: oneOf(['currency', 'percent']),
  align: oneOf(['left', 'center', 'right']),
  type: oneOf(['primary', 'seconday', 'super', 'attention']),
  hintLabel: oneOfType([string, node]),
  hintLableEnable: bool,
};

const _defaultProps = {
  bold: false,
  size: 'm',
  align: 'left',
  type: 'seconday',
  hintLabel: 'Up to',
  hintLableEnable: false
};

class DigitalLabel extends React.Component {
  static displayName = 'DigitalLabel';

  static propTypes = _propTypes;
  static defaultProps = _defaultProps;

  render() {
      const {
        type, bold, align, size, value,
        className, digitalStyle, hintLabel, hintLableEnable
      } = this.props;
      const textProps = {
        align, size, type, bold
      };
      const classes = cn(
        'an-dgt-label',
        {
          'an-dgt-label--bold': bold,
          'an-dgt-label--with-hint': hintLableEnable,
          [`an-dgt-label--align-${align}`]: align,
          [`an-dgt-label--size-${size}`]: size,
          [`an-dgt-label--type-${type}`]: type,
          [`an-dgt-label--style-${digitalStyle}`]: digitalStyle
        },
        className
      );

      return (
          <div className={classes}>
            {
              hintLableEnable &&
                <div className="an-dgt-label__hint">
                  {hintLabel}
                </div>
            }
            <Text {...textProps}>
              {
                digitalStyle ?
                  <FormattedNumber numberStyle={digitalStyle} currency="USD" value={value} /> :
                  <span>{value}</span>
              }
            </Text>
          </div>
      );
  }
}

export default DigitalLabel;
