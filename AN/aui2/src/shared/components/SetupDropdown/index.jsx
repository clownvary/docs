import PropTypes from 'prop-types';
import React from 'react';
import { findDOMNode } from 'react-dom';
import * as da from 'react-base-ui/lib/utils/dataAccess';
import { filterBy } from 'shared/utils/func';
import UIComponent from 'shared/components/UIComponent';
import Input from 'react-base-ui/lib/components/Input';
import './index.less';

const FORMATTIMEREG = /^(\d+\.?\d*)\s?(Min|min|h|H)?$/;


const isValidValue = val => FORMATTIMEREG.test(val);

export default class SetupDropdown extends UIComponent {

  constructor(props) {
    super(props);

    const defaultValue = this.defaultValueFromProps();
    const data = this.listData();
    const activeItemIndex = SetupDropdown.getInitActiveIndex(data, defaultValue);

    this.state = {
      isExpanded: false,
      value: defaultValue,
      activeItemIndex,
      data
    };
  }

  componentWillReceiveProps(nextProps) {
    const newState = {};

    if (nextProps.value !== this.props.value) {
      newState.value = nextProps.value;
    }
    if (!da.is(nextProps.data, this.props.data)) {
      newState.data = nextProps.data;
    }

    if (Object.keys(newState).length > 0) {
      this.setState(newState, () => {
        this._refs.input.value = SetupDropdown.generateFormattedText(nextProps.value);
      });
    }
  }

  hideWhenClickOutSide = (e) => {
    const setupDropdownDOM = findDOMNode(this._refs.setupDropdown);
    if (this.state.isExpanded && setupDropdownDOM) {
      const x = e.clientX;
      const y = e.clientY;
      const pos = setupDropdownDOM.getBoundingClientRect();

      (x < pos.left || y < pos.top || x > pos.right || y > pos.bottom) &&
        this.setState({ isExpanded: false });
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.hideWhenClickOutSide);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.hideWhenClickOutSide);
  }

  componentDidUpdate() {
    const itemMenu = this._refs.ulMenu;
    const activeItem = itemMenu.querySelector('.setup-dropdown-active-item');
    if (activeItem) {
      const itemMenuHeight = itemMenu.offsetHeight;
      const itemMenuScrollTop = itemMenu.scrollTop;
      const activeItemTop = activeItem.offsetTop;
      const activeItemHeight = activeItem.offsetHeight;
      if ((activeItemTop + activeItemHeight) - itemMenuHeight - itemMenuScrollTop > 0) {
        itemMenu.scrollTop = (activeItemTop + activeItemHeight) - itemMenuHeight;
      } else if (activeItemTop < itemMenuScrollTop) {
        itemMenu.scrollTop = activeItemTop;
      }
    }
  }

  render() {
    const {
      className, style,
      maxHeight, name,
      disabled,
      disableTextInput, ...rest
    } = this.props;

    const { isExpanded, value, activeItemIndex, data } = this.state;
    const dataProps = filterBy(rest, 'data-');

    return (
      <div
        ref={(c) => { this._refs.setupDropdown = c; }}
        className={`setup-dropdown ${className || ''}`}
        style={style}
        {...dataProps}
        onKeyDown={this.navigateByKeys}
        onBlur={this.onBlur}
      >
        <Input
          defaultValue={SetupDropdown.generateFormattedText(value && this.state.value)} name={name}
          ref={(c) => { this._refs.input = c; }}
          readOnly={disableTextInput || false}
          disabled={disabled}
          onChange={this.onChange}
          onFocus={this.toggleMenu}
        />
        <ul
          className={`setup-dropdown-menu ${!disabled && isExpanded ? '' : 'u-hidden'}`}
          // eslint-disable-next-line jsx-a11y/tabindex-no-positive
          tabIndex="1"
          style={{ maxHeight }}
          ref={(c) => { this._refs.ulMenu = c; }}
        >
          {data.map((item, i) => {
            const liClassName = i === activeItemIndex ? 'setup-dropdown-active-item' : '';
            return (
              <li
                key={item.value}
                className={liClassName}
                onClick={() => { this.onSelect(item, i); }}
              >
                {item.text}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  onSelect = (item, i) => {
    const { value, text } = item;
    const { onSelect } = this.props;

    this.setState({
      value,
      isExpanded: false,
      activeItemIndex: i
    }, () => {
      this._refs.input.value = text;
      if (onSelect) onSelect(item);
    });
  }

  onChange = (e) => {
    const value = e.target.value;
    const isValueValid = isValidValue(value);
    const { onChange } = this.props;

    if (onChange) onChange(value);

    if (!isValueValid) return false;

    const index = SetupDropdown.getActiveItemIndex(this.state.data,
      SetupDropdown.generateFormattedValue(value));

    this.setState({
      activeItemIndex: index
    });
    return false;
  }

  listData = () => {
    const { data } = this.props;

    if (data && data.length > 0) {
      return data;
    }
    const defaultData = [];
    defaultData.push({ value: 0, text: '0 Min' });
    defaultData.push({ value: 3, text: '3 Min' });
    defaultData.push({ value: 5, text: '5 Min' });
    defaultData.push({ value: 10, text: '10 Min' });
    defaultData.push({ value: 15, text: '15 Min' });
    defaultData.push({ value: 30, text: '30 Min' });
    defaultData.push({ value: 45, text: '45 Min' });
    defaultData.push({ value: 60, text: '1 H' });
    defaultData.push({ value: 90, text: '1.5 H' });
    defaultData.push({ value: 120, text: '2 H' });
    defaultData.push({ value: 180, text: '3 H' });
    defaultData.push({ value: 200, text: '4 H' });
    defaultData.push({ value: 300, text: '5 H' });

    return defaultData;
  }

  static getMinutes(min) {
    const MAX_MINUTES = 99.9 * 60;
    return (min > MAX_MINUTES) ? MAX_MINUTES : parseInt(min, 10);
  }

  static getHours(hour) {
    const MAX_HOURS = 99.9;
    return (hour > MAX_HOURS) ? MAX_HOURS : parseFloat(hour).toFixed(1).replace('.0', '');
  }

  static generateFormattedValue(value) {
    if (!isValidValue(value)) {
      return 0;
    }

    const match = (`${value}`).match(FORMATTIMEREG);
    /* istanbul ignore next */
    let num = match[1] || 0;
    const unit = match[2];

    if (unit && (unit === 'H' || unit === 'h')) {
      num *= 60;
    }

    return SetupDropdown.getMinutes(num);
  }

  static generateFormattedText(time) {
    if (!isValidValue(time)) {
      return '0 Min';
    }

    const match = (`${time}`).match(FORMATTIMEREG);
    /* istanbul ignore next */
    const num = match[1] || 0;
    const unit = match[2];

    if (unit) {
      if (unit === 'Min' || unit === 'min') {
        if (num > 59) {
          return `${SetupDropdown.getHours(num / 60)} H`;
        }
        return `${SetupDropdown.getMinutes(num)} Min`;
      }
      return `${SetupDropdown.getHours(num)} H`;
    } else if (num > 59) {
      return `${SetupDropdown.getHours(num / 60)} H`;
    }
    return `${SetupDropdown.getMinutes(num)} Min`;
  }

  defaultValueFromProps = () => {
    const value = this.props.value;
    return SetupDropdown.generateFormattedValue(value);
  }

  static getActiveItemIndex(data, currentValue) {
    for (let index = 0; index < data.length; index += 1) {
      const { value } = data[index];
      if (value === currentValue) return index;
    }

    return -1;
  }

  static getInitActiveIndex(data, currentValue) {
    return SetupDropdown.getActiveItemIndex(data, currentValue);
  }

  toggleMenu = () => {
    clearTimeout(this._timer);
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  }

  onBlur = () => {
    const { onBlur } = this.props;
    const { data } = this.state;


    this._timer = setTimeout(() => {
      let value = this._refs.input.value;

      if (!isValidValue(value)) {
        value = 0;
      }

      const stateValue = SetupDropdown.generateFormattedValue(value);
      const stateIndex = SetupDropdown.getActiveItemIndex(data, stateValue);

      this.setState({
        activeItemIndex: stateIndex,
        value: stateValue
      }, () => {
        const text = SetupDropdown.generateFormattedText(value);
        this._refs.input.value = text;
        onBlur && onBlur({ value: stateValue, text });
      });
    }, 150);
  }

  navigateByKeys = (e) => {
    let state = null;
    const { activeItemIndex, data } = this.state;
    const optionCount = data.length;

    switch (e.keyCode) {
      case 9: {
        this.setState({ isExpanded: false });
        break;
      }
      case 38: // up
        state = {
          isExpanded: true,
          activeItemIndex: activeItemIndex - 1 >= 0 ? activeItemIndex - 1 : optionCount - 1
        };
        this.setState(state);
        break;
      case 40: // down
        state = {
          isExpanded: true,
          activeItemIndex: activeItemIndex + 1 < optionCount ? activeItemIndex + 1 : 0
        };
        this.setState(state);
        break;
      case 13: // enter
        if (activeItemIndex >= 0) {
          this.onSelect(data[activeItemIndex], activeItemIndex);
        } else {
          this.setState({
            isExpanded: false
          });
        }
        break;
      case 27: // escape
        state = {
          isExpanded: false,
          activeItemIndex: -1
        };
        this.setState(state);
        break;
      default:
        break;
    }
  }
}

SetupDropdown.defaultProps = {
  name: 'setup-dropdown',
  value: 0,
  disabled: false,
  disableTextInput: false
};

SetupDropdown.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string, // Name for field. Default "Time".
  // Disable typing in the setup-dropdown input box and select from dropdown.
  disabled: PropTypes.bool,
  // Disable typing in the setup-dropdown input box; force users to select from list.
  disableTextInput: PropTypes.bool,
  onSelect: PropTypes.func, // The select dropdown event
  onBlur: PropTypes.func // The input onBlur event.
};
