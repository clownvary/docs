import React from 'react';
import isFunction from 'lodash/isFunction';
import omit from 'lodash/omit';
import { bool, string, node, shape, arrayOf, oneOfType, number, func } from 'prop-types';
import classNames from 'classnames';
import { attachPopupMenu } from '../../services/menu';
import ButtonType from './consts/ButtonType';
/**
 * Default PropTypes of Button.
 */
const ButtonPropTypes = {
  /**
   * Determines whether the button is a not a Submit button.
  */
  noSubmit: bool,
  /**
   * Whether or not to show loading icon.
  */
  loading: bool,
  /**
   * Determines the button type.
  */
  type: string,
  /**
   * Determines the button size.
   */
  size: string,
  /**
   * Whether or not to disable button.
   */
  disabled: bool,
  /**
   * Custom class name.
  */
  className: string,
  /**
   * Child Node
  */
  children: node,

  /**
   * Menu data list.
   */
  menuData: arrayOf(shape({
    text: string.isRequired,
    value: oneOfType([number, string]).isRequired
  })),

  /**
   * Triger the functtion when select menu item.
   */
  onMenuSelect: func,

  /**
   * Triger the functtion when click button.
   */
  onClick: func,

  /**
   * Triger the function when hover button.
   */
  onMouseHover: func,

  /**
   * Triger the function when enter button.
   */
  onMouseEnter: func,

  /**
   * Triger the function when leave button.
   */
  onMouseLeave: func

};

/** Default Props for Buttons */
const ButtonProps = {
  noSubmit: false,
  loading: false,
  type: ButtonType.SECONDARY,
  menuData: []
};


/** UI component that displays Button with variant settings.*/
class Button extends React.PureComponent {
  static displayName = 'Button';
  static defaultProps = ButtonProps;
  static propTypes = ButtonPropTypes;

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onClick(e) {
    const { onClick, id } = this.props;
    isFunction(onClick) && onClick(e, { id });
  }

  onMouseOver(e) {
    const { onMouseHover, id } = this.props;
    isFunction(onMouseHover) && onMouseHover(e, { id });
  }

  onMouseEnter(e) {
    const { onMouseEnter, id } = this.props;
    isFunction(onMouseEnter) && onMouseEnter(e, { id });
  }

  onMouseLeave(e) {
    const { onMouseLeave, id } = this.props;
    isFunction(onMouseLeave) && onMouseLeave(e, { id });
  }

  componentDidMount() {
    const { menuData, onMenuSelect, id } = this.props;

    if (menuData && menuData.length) {
      attachPopupMenu(
        id,
        {
          data: menuData,
          onSelected: onMenuSelect
        },
        {
          target: this.button
        }
      );
    }
  }

  render() {
    const {
      noSubmit,
      loading,
      type,
      size,
      children,
      className,
      ...rest
    } = this.props;

    const classes = classNames(
      {
        btn: true,
        [`btn-${type}`]: type,
        [`btn--${size}`]: size,
        'btn--loading': loading
      },
      className,
    );

    return (
      <button
        {...omit(rest, 'menuData')}
        type={noSubmit ? 'button' : 'submit'}
        className={classes}
        onClick={this.onClick}
        onMouseOver={this.onMouseOver}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        ref={(c) => { this.button = c; }}
      >
        {loading && <i className="icon icon-spinner icon--loading" />}
        <span>{children}</span>
      </button>
    );
  }
}

export default Button;
