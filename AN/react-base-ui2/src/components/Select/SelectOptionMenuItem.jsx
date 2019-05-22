import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { KeyCode } from '../../consts';

const PickupOptionMenuItemPropTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  /**
   * option item data to render as an menu item
   */
  option: PropTypes.object,
  /**
   * determine the active state of current option
   */
  active: PropTypes.bool,
  /**
   * determine the selected state of current option
   */
  selected: PropTypes.bool,
  /**
   * function which required current component as parameter
   */
  saveItemRef: PropTypes.func,
  /**
   * callback function trigger by user press keyboard button down
   */
  onKeyDown: PropTypes.func,
  /**
   * callback function triggered by user hover on current option
   */
  onItemHover: PropTypes.func,
  /**
   * callback function triggered by user click current option
   */
  onItemClick: PropTypes.func,
  /**
   * callback function triggered by user select current option
   */
  onItemSelect: PropTypes.func,
  /**
   * callback function triggered by user deselect on current option
   */
  onItemDeselect: PropTypes.func,
  /**
   * function to customize rendering current option
   */
  optionItemRenderer: PropTypes.func
};

const PickupOptionMenuItemDefaultProps = {};

class SelectOptionMenuItem extends Component {
  static propTypes = PickupOptionMenuItemPropTypes;
  static defaultProps = PickupOptionMenuItemDefaultProps;

  componentDidMount() {
    this.callSaveInstanceRef();
  }

  componentDidUpdate() {
    this.callSaveInstanceRef();
  }

  onItemMouseLeave = () => {
    const { option, onItemHover } = this.props;
    const { value } = option;
    onItemHover && onItemHover({ value, hover: false });
  };

  onItemMouseEnter = () => {
    const { option, onItemHover } = this.props;
    const { value } = option;
    onItemHover && onItemHover({ value, hover: true });
  };

  onItemClick = (e) => {
    e.preventDefault();
    const { selected, option, onItemClick, onItemSelect, onItemDeselect } = this.props;
    const { value } = option;

    if (selected) {
      onItemDeselect && onItemDeselect(e, value);
    } else {
      onItemSelect && onItemSelect(e, value);
    }
    onItemClick && onItemClick(e, { value, selected });
  };

  onKeyDown = (e, { emptyMenu }) => {
    const { selected, option, onKeyDown, onItemSelect, onItemDeselect } = this.props;
    const { value } = option;

    if (!emptyMenu) {
      const keyCode = e.keyCode;
      if (keyCode === KeyCode.SPACE || keyCode === KeyCode.ENTER) {
        if (selected) {
          onItemDeselect && onItemDeselect(e, value);
        } else {
          onItemSelect && onItemSelect(e, value);
        }
        onKeyDown && onKeyDown(e, { value, selected });
        return true;
      }
    }

    if (onKeyDown) {
      onKeyDown(e, { value, selected });
      return true;
    }
    return false;
  };

  getOptionItemPrefixCls = () => `${this.props.prefixCls}-option-item`;

  getOptionItemRef = () => this._optionItemRef;

  callSaveInstanceRef = () => {
    const { option: { value }, saveItemRef } = this.props;
    saveItemRef && saveItemRef(value, this);
  };

  saveOptionItemRef = (node) => {
    this._optionItemRef = node;
  };

  render() {
    const { className, option, active, selected, optionItemRenderer } = this.props;
    const optionItemPrefixCls = this.getOptionItemPrefixCls();
    const mouseEvents = option.disabled ? {} : {
      onMouseEnter: this.onItemMouseEnter,
      onMouseLeave: this.onItemMouseLeave,
      onMouseDown: this.onItemClick
    };

    if (optionItemRenderer) {
      const itemProps = {
        ...this.props,
        optionItemPrefixCls,
        mouseEvents
      };
      return (
        <li ref={this.saveOptionItemRef}>
          {optionItemRenderer(itemProps)}
        </li>
      );
    }

    const itemClassName = classNames(`${optionItemPrefixCls}`, className, {
      [`${optionItemPrefixCls}__active`]: !option.disabled && active,
      [`${optionItemPrefixCls}__selected`]: selected,
      [`${optionItemPrefixCls}__disabled`]: option.disabled
    });
    return (
      <li
        ref={this.saveOptionItemRef}
      >
        <div
          className={itemClassName}
          {...mouseEvents}
        >
          {option.text}
        </div>
      </li>
    );
  }
}

export default SelectOptionMenuItem;
