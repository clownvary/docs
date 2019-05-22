import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MenuItem from './SelectOptionMenuItem';
import { KeyCode } from '../../consts';

const SelectOptionMenuPropTypes = {
  prefixCls: PropTypes.string,
  /**
   * select option object array to render as option item list by default
   */
  optionData: PropTypes.array,
  /**
   * determine which option is displaying as selected state
   */
  selectedValues: PropTypes.array,
  /**
   * determine which option is displaying as active state
   */
  activeValue: PropTypes.string,
  /**
   * determine the menu hidden state
   */
  hidden: PropTypes.bool,
  /**
   * option menu's css style width
   */
  style: PropTypes.object,
  /**
   * option menu's css style maxHeight
   */
  menuOptionsMaxHeight: PropTypes.number,
  /**
   * function to customize rendering the footer section below all option item
   */
  optionFooterRenderer: PropTypes.func,
  /**
   * function to customize rendering a single option item
   */
  optionItemRenderer: PropTypes.func,
  /**
   * onClick callback function triggered by user click on an option item
   */
  onOptionItemClick: PropTypes.func,
  /**
   * onClick callback function triggered by user select an option
   */
  onOptionItemSelect: PropTypes.func,
  /**
   * onClick callback function triggered by user deselect an option
   */
  onOptionItemDeselect: PropTypes.func
};

const unsetActiveValue = '_unset';

const SelectOptionMenuDefaultProps = {
  selectedValues: [],
  menuOptionsMaxHeight: 300
};

class SelectOptionMenu extends Component {
  static propTypes = SelectOptionMenuPropTypes;
  static defaultProps = SelectOptionMenuDefaultProps;

  static unsetActiveValue = unsetActiveValue;

  constructor(props) {
    super(props);

    const { activeValue = unsetActiveValue } = props;

    this.state = {
      activeValue
    };

    this._itemInstances = {};
  }

  componentDidMount() {
    this.forceAlign();
  }

  componentWillReceiveProps(nextProps) {
    const { activeValue: nextActiveValue } = nextProps;
    const { activeValue } = this.state;
    if (nextActiveValue && nextActiveValue !== activeValue) {
      this.setActiveValue(nextActiveValue);
    }
  }

  componentDidUpdate() {
    this.forceAlign();

    const activeItemInstance = this.getActiveItemInstances();
    if (activeItemInstance && activeItemInstance.getOptionItemRef()) {
      const activeItem = activeItemInstance.getOptionItemRef();
      const itemMenuHeight = this._optionMenuRef.offsetHeight;
      const itemMenuScrollTop = this._optionMenuRef.scrollTop;
      const activeItemTop = activeItem.offsetTop;
      const activeItemHeight = activeItem.offsetHeight;
      /* eslint no-mixed-operators: 0 */
      /* istanbul ignore next */
      if (activeItemTop + activeItemHeight - itemMenuHeight - itemMenuScrollTop > 0) {
        this._optionMenuRef.scrollTop = activeItemTop + activeItemHeight - itemMenuHeight;
      } else if (activeItemTop < itemMenuScrollTop) {
        this._optionMenuRef.scrollTop = activeItemTop;
      }
    }
  }

  componentWillUnmount() {
    this._itemInstances = null;
  }

  onItemSelect = (e, value) => {
    const { selectedValues, onOptionItemSelect } = this.props;
    const nextSelectedValues = selectedValues.filter(selectedValue => selectedValue !== value);
    nextSelectedValues.length === selectedValues.length && nextSelectedValues.push(value);
    onOptionItemSelect && onOptionItemSelect(e, value, nextSelectedValues);
  }

  onItemDeselect = (e, value) => {
    const { selectedValues, onOptionItemDeselect } = this.props;
    const nextSelectedValues = selectedValues.filter(selectedValue => selectedValue !== value);
    onOptionItemDeselect && onOptionItemDeselect(e, value, nextSelectedValues);
  }

  onItemHover = ({ value, hover }) => {
    const { activeValue } = this.state;
    const nextActiveValue = hover ? value : unsetActiveValue;
    activeValue !== nextActiveValue && this.setActiveValue(nextActiveValue);
  }

  onKeyDown = (e) => {
    const keyCode = e.keyCode;
    const { optionData } = this.props;
    const emptyMenu = !optionData || optionData.length === 0;
    let handledByItem = false;
    Object.keys(this._itemInstances).forEach((key) => {
      const itemInstance = this._itemInstances[key];
      if (itemInstance && itemInstance.props.active && itemInstance.onKeyDown) {
        handledByItem = itemInstance.onKeyDown(e, { emptyMenu });
      }
    });
    if (handledByItem) {
      return true;
    }

    if (keyCode === KeyCode.UP || keyCode === KeyCode.DOWN) {
      const direction = keyCode === KeyCode.UP ? -1 : 1;
      const nextActiveValue = this.findNextActiveValueByDirection(direction);
      const { activeValue } = this.state;
      activeValue !== nextActiveValue && this.setActiveValue(nextActiveValue);
      return true;
    }
    return false;
  }

  getActiveItemInstances = () => {
    const { activeValue } = this.state;
    const activeItemKeys = Object.keys(this._itemInstances).filter(key => key === activeValue);
    if (activeItemKeys.length) {
      return this._itemInstances[activeItemKeys[0]];
    }
    return null;
  }

  setActiveValue = (activeValue) => {
    this.setState({ activeValue });
  }

  saveOptionMenuRootRef = (node) => {
    this._optionMenuRootRef = node;
  }

  saveOptionMenuRef = (node) => {
    this._optionMenuRef = node;
  }

  saveItemInstanceRef = (key, node) => {
    /* istanbul ignore next */
    if (key && node) {
      this._itemInstances[key] = node;
    }
  }

  forceAlign = () => {
    const { calculateOptionMenuPosition } = this.props;
    if (calculateOptionMenuPosition) {
      const positionStyle = calculateOptionMenuPosition();
      this._optionMenuRootRef.style.top = positionStyle.top;
      this._optionMenuRootRef.style.left = positionStyle.left;
    }
  }

  findNextActiveValueByDirection = (direction) => {
    const { activeValue } = this.state;
    const { optionData } = this.props;
    let activeItemIndex = 0;
    if (optionData.length === 0) {
      return unsetActiveValue;
    }
    if (activeValue === unsetActiveValue) {
      return optionData[activeItemIndex].value;
    }
    optionData.every((option, index) => {
      if (option.value === activeValue) {
        activeItemIndex = index;
        return false;
      }
      return true;
    });
    activeItemIndex += direction;
    if (activeItemIndex < 0) {
      activeItemIndex = optionData.length - 1;
    }
    if (activeItemIndex >= optionData.length) {
      activeItemIndex = 0;
    }
    return optionData[activeItemIndex].value;
  }

  renderMenuItems = () => {
    const {
      prefixCls, optionData, selectedValues, optionItemRenderer, onOptionItemClick
    } = this.props;
    const { activeValue } = this.state;
    return optionData.map((option) => {
      const selected = selectedValues.indexOf(option.value) >= 0;
      const active = activeValue === option.value;
      return (
        <MenuItem
          key={`menu-option-item__${option.value}`}
          prefixCls={prefixCls}
          selected={selected}
          active={active}
          option={option}
          saveItemRef={this.saveItemInstanceRef}
          optionItemRenderer={optionItemRenderer}
          onItemClick={onOptionItemClick}
          onItemHover={this.onItemHover}
          onItemSelect={this.onItemSelect}
          onItemDeselect={this.onItemDeselect}
        />
      );
    });
  };

  render() {
    const {
      prefixCls, hidden, style,
      optionData, optionFooterRenderer,
      menuOptionsMaxHeight
    } = this.props;
    const menuItems = this.renderMenuItems();
    const menuFooter = optionFooterRenderer && optionFooterRenderer(this.props);
    const menuHidden = hidden || ((!optionData || optionData.length === 0) && !menuFooter);
    return (
      <div
        ref={this.saveOptionMenuRootRef}
        className={classNames(`${prefixCls}-option`, { 'u-hidden': menuHidden })}
        style={{ ...style }}
      >
        <div
          className={`${prefixCls}-option-list`}
          style={{ maxHeight: `${menuOptionsMaxHeight}px` }}
          onKeyDown={this.onKeyDown}
          ref={this.saveOptionMenuRef}
        >
          <ul>
            {menuItems}
          </ul>
        </div>
        {menuFooter}
      </div>
    );
  }
}

export default SelectOptionMenu;
