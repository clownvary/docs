import React from 'react';
import { string, bool, func, shape, arrayOf, oneOfType, number } from 'prop-types';
import Button from '../Button';

/**
 * Default PropTypes of ButtonBar.
 */
const ButtonBarPropTypes = {
  /**
   * ButtonBar data list.
   */
  data: arrayOf(shape({
    id: string.isRequired,
    text: string,
    size: string,
    type: string,
    loading: bool,
    icon: '',
    disabled: bool,
    menuData: arrayOf(shape({
      text: string.isRequired,
      value: oneOfType([number, string]).isRequired
    })),
    onMenuSelected: func
  })),
  /**
   * Whether or not to disable buttonbar.
   */
  disabled: bool,
  /**
   * ButtonBar class name.
   */
  className: string,

  /**
   * Triger the functtion when click button.
   */
  onButtonClick: func,

  /**
   * Triger the function when hover button.
   */
  onButtonMouseHover: func,

  /**
   * Triger the function when enter button.
   */
  onButtonMouseEnter: func,

  /**
   * Triger the function when leave button.
   */
  onButtonMouseLeave: func,

  /**
   * Triger the functtion when select menu item of the button.
   */
  onButtonMenuSelect: func
};

/** Default Props for ButtonBar */
const ButtonBarProps = {
  data: [],
  disabled: false
};

/** UI component that displays ButtonBar with variant settings.*/
class ButtonBar extends React.PureComponent {
  static displayName = 'ButtonBar';
  static defaultProps = ButtonBarProps;
  static propTypes = ButtonBarPropTypes;

  render() {
    const {
      data,
      disabled: disabledBar,
      className,
      onButtonClick,
      onButtonMouseHover,
      onButtonMouseEnter,
      onButtonMouseLeave,
      onButtonMenuSelect
    } = this.props;

    return (
      <div className={`button-bar ${className}`} >
        {
          data.map(({ text, icon, disabled, id, ...rest }) => (
            <Button
              key={id}
              id={id}
              disabled={disabled || disabledBar}
              onClick={onButtonClick}
              onMouseHover={onButtonMouseHover}
              onMouseEnter={onButtonMouseEnter}
              onMouseLeave={onButtonMouseLeave}
              onMenuSelect={onButtonMenuSelect}
              {...rest}
            >
              {text || (icon ? <i className={`icon ${icon}`} /> : null)}
            </Button>
          ))
        }
      </div>
    );
  }
}

export default ButtonBar;
