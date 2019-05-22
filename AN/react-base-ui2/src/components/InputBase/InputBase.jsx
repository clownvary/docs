import React from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import isPlainObject from 'lodash/isPlainObject';
import findIndex from 'lodash/findIndex';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import toString from 'lodash/toString';
import identity from 'lodash/identity';
import throttle from 'lodash/throttle';
import map from 'lodash/map';
import isEqual from 'lodash/isEqual';
import { intlShape } from 'react-intl';

import { enableClearable, disableClearable } from '../../services/decoration';
import CaretUtils from '../../utils/caret';
import cls from '../../utils/cls';
import { filterValidCustomProps } from '../../utils';
import InputResult from './InputResult';
import * as SpinSpeed from './consts/SpinSpeed';

import List, { ListType, SelectionMode } from '../List';
import { DefaultCSSPrefix, Dock, Trigger, KeyCode } from '../../consts';

const { bool, string, number, object, oneOfType, func, oneOf, array } = PropTypes;

/* eslint react/sort-comp: 0 */
/* eslint-disable  react/no-unused-prop-types */
/* eslint-disable  react/forbid-prop-types */
/* eslint-disable  no-nested-ternary */

/** Default PropTypes of InputBase.
 * @memberof InputBase
*/
const InputBasePropTypes = {
  /** The unique id for automation test.
   * @type {string}
  */
  'data-qa-id': string,
  /** The CSS class prefix.
   * @type {string}
  */
  prefix: string,
  /** The text value.
   * @type {string|number|object}
  */
  value: oneOfType([string, number, object]),
  /** The DOM id.
   * @type {string}
  */
  id: string,
  /** The name of the input
   * @type {string}
   */
  name: string,
  /** Customize class name for the input wrapper.
   * @type {string}
  */
  className: string,
  /** Customize class name for the popup list.
   * @type {string}
  */
  listClassName: string,
  /** Determines the width of the popup list.
   * @type {string}
  */
  listWidth: string,
  /** Determines the minimum width of the popup list.
   * @type {string}
  */
  listMinWidth: string,
  /** Determines the maximum height of the popup list.
   * @type {string}
  */
  listMaxHeight: string,
  /** Config the list.
   * {@link List.ListPropTypes.config}
   * @type {object}
  */
  listConfig: object,
  /** Config the popup service.
   * @type {object}
  */
  listPopupOptions: object,
  /** Customize func which render the list item by self.
   * {@link List.ListPropTypes.renderer}
   * @type {func}
  */
  onListRender: func,
  /** Array of list. Each item is an object.
   * {@link List.ListPropTypes.data}
   * @type {array}
  */
  items: array,
  /** The callback function that is triggered when the list popups.
   * @type {func}
  */
  onListOpen: func,
  /** The callback function that is triggered when the popup list closes.
   * @type {func}
  */
  onListClose: func,
  /** Determines the style of the input wrapper.
   * @type {object}
  */
  style: object,
  /** Determines the Input size.
   * @type {Size}
  */
  size: oneOf(['sm', 'md', 'lg']).isRequired,
  /** Determines the maximum length of the input value.
   * @type {number}
  */
  maxLength: number,
  /** The enable/disable state
   * @type {boolean}
  */
  disabled: bool,
  /** Determines whether the input is readonly.
   * @type {boolean}
  */
  readonly: bool,
  /** Specifies the short hint that describes the expected value of the input field.
   * @type {boolean}
  */
  placeHolder: string,
  /** Whether to show clear class and enable clear the input value.
   * @type {boolean}
  */
  showClear: bool,
  /** Whether to show the trigger icon for the Input.
   * @type {boolean}
  */
  showTrigger: bool,
  /** Whether to show the second trigger icon for the Input.
   * @type {boolean}
  */
  showTrigger2: bool,
  /** whether to show the spinner bar for the input.
   * @type {boolean}
  */
  showSpinner: bool,
  /** Whether update value by up and down key.
   * @type {boolean}
  */
  allowKeySpin: bool,
  /** Whether update value by mouse scroll.
   * @type {boolean}
  */
  allowMouseSpin: bool,
  /** Determines the currency symbol to be used.
   * @type {string}
  */
  currency: string,
  /** Determines how the input value is aligned and the popup position and can be 'left' or 'right'.
   * @type {string}
  */
  textAlign: string,
  /** The class of the trigger icon.
   * @type {string}
  */
  triggerIcon: string,
  /** The class of the toggle trigger icon.
   * @type {string}
  */
  triggerIconToggle: string,
  /** The description for the trigger icon.
   * @type {string}
  */
  triggerIconHint: string,
  /** The class of the spinner icon.
   * @type {string}
  */
  triggerIcon2: string,
  /** The class of the toggle spinner icon.
   * @type {string}
  */
  triggerIconToggle2: string,
  /** The description for the spinner icon.
   * @type {string}
  */
  triggerIconHint2: string,
  /** The icon displayed inside the input
   * @type {string}
  */
  icon: string,
  /** The description for the icon
   * @type {string}
  */
  iconHint: string,
  /** The content for aria-label
   * @type {string}
  */
  ariaLabel: string
};

/** Default Props for InputBase class */
const InputBaseProps = {
  id: '',
  name: '',
  size: 'md',
  'data-qa-id': '',
  prefix: `${DefaultCSSPrefix}`,
  disabled: false,
  value: '',
  className: '',
  listClassName: '',
  listWidth: 'auto',
  listMaxHeight: '300px',
  listConfig: {},
  listPopupOptions: {},
  onListOpen: identity,
  onListClose: identity,
  items: [],
  placeHolder: '',
  onTextChange: identity,
  onFocus: identity,
  onBlur: identity,
  showClear: false,
  showTrigger: false,
  showTrigger2: false,
  showSpinner: false,
  allowKeySpin: false,
  allowMouseSpin: false,
  currency: 'USD',
  textAlign: 'left',
  triggerIcon: 'icon-chevron-down',
  triggerIconToggle: 'icon-chevron-up',
  triggerIconHint: '',
  triggerIcon2: 'icon-chevron-down',
  triggerIconToggle2: 'icon-chevron-up',
  triggerIconHint2: '',
  icon: '',
  iconHint: '',
  allowBlank: true,
  ariaLabel: 'Input box'
};

/** Base class for all Input components */
class InputBase extends React.PureComponent {
  static displayName = 'InputBase';
  static defaultProps = InputBaseProps;
  static propTypes = InputBasePropTypes;

  static contextTypes = {
    intl: intlShape
  };

  constructor(props) {
    super(props);

    this.textProvider = this.createTextProvider();
    this.silence = false;
    this.spinCount = 0;
    this.spinFuncs = {};
    this.spinFuncs[SpinSpeed.FAST] = throttle(this.doSpin, 50).bind(this);
    this.spinFuncs[SpinSpeed.MEDIUM] = throttle(this.doSpin, 100).bind(this);
    this.spinFuncs[SpinSpeed.SLOW] = throttle(this.doSpin, 200).bind(this);

    const { value, items } = props;
    this.state = {
      defaultValue: value || '',
      triggerToggled: false,
      triggerToggled2: false,
      stateClassName: ''
    };

    this.selection = { start: 0, end: 0 };
    this.listItems = this.createListItems(items);
  }

  componentDidMount() {
    this.preText = this.input.value;

    if (this.allowClear()) {
      const paddingRight = this.getButtonCount() * 24;

      this.clearable = enableClearable(this.input, {
        trigger: Trigger.FOCUS,
        paddingRight,
        onClear: () => {
          this.onClear();
          this.updateClear();
        }
      });
    }

    const onMouseWheel = (e, delta) => {
      const { allowMouseSpin = false } = this.props;
      if (allowMouseSpin) {
        delta = delta || e.deltaY;
        if (delta !== 0) {
          this.onSpin(delta > 0, false);
        }
      }
    };

    const mh = throttle(onMouseWheel, 100);
    this.input.addEventListener('wheel', mh, false);

    this.updateText();
  }

  componentWillUnmount() {
    disableClearable(this.input);
  }

  updateValue(preValue, nextValue) {
    this.setText(nextValue);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const {
      currency: preCurrency,
      items: preItems,
      value: preValue
    } = this.props;

    const {
      currency: nextCurrency,
      items: nextItems,
      value: nextValue
    } = nextProps;

    if (this.textProvider && preCurrency !== nextCurrency) {
      this.textProvider.setCurrency(nextCurrency);
    }

    if (!isEqual(preValue, nextValue)) {
      this.updateValue(preValue, nextValue);
    }

    if (!isEqual(preItems, nextItems)) {
      this.listItems = this.createListItems(nextItems);
    }

    const { intl = null } = this.context;
    const { intl: nextIntl = null } = nextContext;

    const intlChanged = (nextIntl !== intl || preCurrency !== nextCurrency);
    if (intlChanged) {
      this.updateText();
    }
  }

  createListItems(items) {
    const listItems = map(items, (item, index) => ({
      ...item,
      index
    }));

    return listItems;
  }

  getListItemText(item) {
    let text = item.text;
    if (isNil(text)) {
      text = item.value || '';
    }

    return toString(text);
  }

  onListSelected(indexes) {
    if (isEmpty(this.listItems) || isEmpty(indexes)) {
      return;
    }

    const i = indexes[0];
    if (i >= 0) {
      const item = this.listItems[i];
      if (item) {
        const text = this.getListItemText(item);
        this.setText(text);
      }
    }
  }

  findInList() {
    const text = this.getText();
    if (!text || isEmpty(this.listItems)) {
      return [-1];
    }

    const index = findIndex(this.listItems, item => text === this.getListItemText(item));
    return [index];
  }

  onListOpen() {
    this.triggerEvent('onListOpen');
  }

  onListClose() {
    this.triggerEvent('onListClose');
  }

  popupList() {
    if (isEmpty(this.listItems)) {
      return;
    }

    const {
      textAlign,
      onListRender,
      listMaxHeight,
      listWidth,
      listMinWidth,
      listClassName,
      prefix,
      listConfig,
      listPopupOptions
     } = this.props;

    const target = this.input;
    const listOptions = {
      data: this.listItems,
      config: {
        selectionMode: SelectionMode.SINGLE,
        listType: ListType.SINGLE,
        disabled: false,
        showCheckAll: false,
        checkable: false,
        asyncable: false,
        maxHeight: `${listMaxHeight}`,
        focused: false,
        showTips: true,
        WCAG: true,
        ...listConfig
      },
      className: cls`${prefix}-list-wrapper input-list-wrapper ${listClassName}`,
      selectedIndex: this.findInList(),
      style: {
        width: listWidth ? `${listWidth}` : `${this.input.offsetWidth}px`,
        minWidth: listMinWidth ? `${listMinWidth}` : `${this.input.offsetWidth}px`
      },
      renderer: onListRender,
      onChange: (v) => {
        this.onListSelected(v);
        this.triggerEvent('onListSelected', v);
        if (this.list) {
          this.list.cancel();
        }
      }
    };

    const dockStyle = (textAlign === 'left' ? Dock.BOTTOM_LEFT : Dock.BOTTOM_RIGHT);
    const popupOptions = {
      target,
      showShadow: false,
      distance: 4,
      dockStyle,
      closeByEscape: true,
      focus: true,
      ...listPopupOptions
    };

    try {
      const list = List.popup(listOptions, popupOptions);
      if (list !== this.list) {
        this.list = list;
        this.onListOpen();
      }
      list.result.then(() => {
        this.onListClose();
      }).catch(() => {
        this.onListClose();
      });
    } catch (e) {
      console.log(e);
    }
  }

  isDegradeMode() {
    return false;
  }

  getContainerClassName() {
    return '';
  }

  createTextProvider() {
    return null;
  }

  allowEdit() {
    return !(this.isReadOnly() || this.isDisabled());
  }

  isReadOnly() {
    return !!this.input.readOnly;
  }

  isDisabled() {
    return !!this.input.disabled;
  }

  isFocused() {
    return this.input === document.activeElement;
  }

  isBlank() {
    return false;
  }

  getSpinSpeed() {
    this.spinCount += 1;
    if (this.spinCount > 10) {
      return SpinSpeed.FAST;
    } else if (this.spinCount > 4) {
      return SpinSpeed.MEDIUM;
    }

    return SpinSpeed.SLOW;
  }

  onSpin(up = false) {
    if (!this.allowEdit() || !this.textProvider) { return; }

    const speed = this.getSpinSpeed();
    const ds = this.spinFuncs[speed];
    if (ds) {
      ds(up);
    }
  }

  doSpin() {
  }

  stopSpin() {
    this.spinCount = 0;
  }

  // Special handling if IME has problem or does not follow events order standard
  onIMEBreakThrough() {
  }

  onKeyPressPreview() {
    return false;
  }

  onKeyDownPreview() {
    return false; // true means handled.
  }

  doInput(ch) {
    const selRange = this.getSelection(true);
    if (selRange.start < selRange.end) {
      this.textProvider.remove(selRange.start, selRange.end - 1);
    }

    const rh = new InputResult();
    const result = this.textProvider.insertAt(ch, selRange.start, rh);
    if (result) {
      this.updateText({
        start: rh.testPosition,
        end: rh.testPosition
      });
    } else {
      this.triggerEvent('onInvalidInput', { value: ch });
    }
  }

  handleIconKeyDown(e, iconIndex) {
    const key = e.keyCode || e.which;

    if (this.isDisabled()) {
      if (key !== KeyCode.TAB) {
        this.stopEvent(e);
      }
      return;
    }

    if (key === KeyCode.ENTER
      || key === KeyCode.SPACE
      || key === KeyCode.UP
      || key === KeyCode.DOWN) {
      if (iconIndex === 1) {
        this.onTriggerClick();
      } else if (iconIndex === 2) {
        this.onTrigger2Click();
      }
      this.stopEvent(e);
    }
  }

  // --Handlers for inner Input-------------------------
  onInputFocus(e) {
    this.updateClear();
    this.triggerEvent('onEnter', e);
    this.triggerEvent('onFocus', e);
  }

  onInputBlur(e) {
    this.syncText();
    this.updateClear();
    e.text = e.text || this.input.value;
    this.triggerEvent('onBlur', e);
    this.triggerEvent('onLeave', e);
  }

  onInputKeyDown(e) {
    if (this.isDegradeMode() || !this.textProvider) {
      this.triggerEvent('onKeyDown', e);
      return;
    }

    this.typing = false;
    this.inputed = false;
    this.selection = CaretUtils.getCaret(this.input);
    const keyCode = e.keyCode || e.which;

    if (!this.allowEdit() || this.onKeyDownPreview(e)) {
      if (keyCode !== KeyCode.TAB) {
        this.stopEvent(e);
      }
      return;
    }

    this.typing = true;
    if ((e.ctrlKey || e.altKey || e.metaKey)) { return; }

    const { allowKeySpin = false } = this.props;
    switch (keyCode) {
      case KeyCode.UP:
        if (allowKeySpin) {
          this.onSpin(true);
          this.stopEvent(e);
          this.typing = false;
        }
        break;
      case KeyCode.DOWN:
        if (allowKeySpin) {
          this.onSpin(false);
          this.stopEvent(e);
          this.typing = false;
        }
        break;
      case KeyCode.BACKSPACE:
        this.deleteSelection(true);
        this.stopEvent(e);
        this.typing = false;
        break;
      case KeyCode.DELETE:
        this.deleteSelection(false);
        this.stopEvent(e);
        this.typing = false;
        break;
      default:
        break;
    }
  }

  onInputKeyUp(e) {
    if (this.isDegradeMode() || !this.textProvider) {
      this.triggerEvent('onKeyUp', e);
      return;
    }

    const keyCode = e.keyCode || e.which;
    if (keyCode === KeyCode.ENTER || keyCode === KeyCode.ESCAPE) { return; }
    if (keyCode === KeyCode.UP || keyCode === KeyCode.DOWN) {
      this.stopSpin();
    }
    this.stopEvent(e);
    this.typing = false;
    this.inputed = false;
  }

  onInputKeyPress(e) {
    if (this.isDegradeMode() || !this.textProvider) {
      this.triggerEvent('onKeyPress', e);
      return;
    }

    e.persist();
    const nativeEvent = e.nativeEvent ? e.nativeEvent : e;

    if ((nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey)) { return; }

    /*
      nativeEvent.char  - IE11
      nativeEvent.key   - Chrome， Safari, FF
      nativeEvent.data  - Safari (IME)
    */
    const ch = nativeEvent.char || nativeEvent.key || nativeEvent.data || e.key || e.data;
    if (ch && !this.onKeyPressPreview(ch)) {
      this.doInput(ch);
    }

    this.inputed = true;
    this.stopEvent(e);
  }

  onMouseUp(e) {
    if (!this.textProvider) {
      this.triggerEvent('onMouseUp', e);
    }
  }

  onInputChange(e) {
    if (this.isDegradeMode() || !this.textProvider) {
      this.triggerEvent('onChange', e);
      this.triggerEvent('onTextChange', e);
      this.onTextChange();
      return;
    }

    if (!this.inputed) {
      this.onIMEBreakThrough(e);
      this.inputed = true;
    }
  }

  onInputPaste(e) {
    if (this.isDegradeMode() || !this.textProvider) {
      this.triggerEvent('onPaste', e);
      return;
    }

    this.stopEvent(e);
    const clipboardData = e.clipboardData || window.clipboardData;
    const text = clipboardData.getData('Text');
    if (text) {
      if (this.isBlank() || this.isSelectAll()) {
        this.setText(text);
      } else {
        this.doInput(text);
      }
    }
  }

  getButtonCount() {
    const {
      showTrigger = false,
      showTrigger2 = false,
      showSpinner = false
    } = this.props;

    const buttonCount = 0 + (showTrigger ? 1 : 0) + (showTrigger2 ? 1 : 0) + (showSpinner ? 1 : 0);
    return buttonCount;
  }

  //--------------------------------

  syncText() {
    if (this.input && this.textProvider) {
      const val = this.input.value;
      const txt = this.getText();
      if (txt !== val) {
        this.setText(val);
      }
    }
  }

  onTriggerClick() {
    this.popupList();
  }

  getProviderOptions() {
    return {};
  }

  getText() {
    if (!this.textProvider) { return this.input.value; }

    const options = this.getProviderOptions();
    return this.textProvider.getText(options);
  }

  setText(text) {
    if (!this.textProvider) {
      this.setInputValue(text);
    } else {
      this.textProvider.setText(text);
      this.updateText();
      this.onTextChange();
    }
  }

  allowClear() {
    const { allowBlank, showClear } = this.props;
    return allowBlank && showClear;
  }

  updateClear() {
    if (this.clearable) {
      const val = this.input.value;
      if (val && this.isFocused()) {
        this.clearable.show();
      } else {
        this.clearable.hide();
      }
    }
  }

  onClear() {
  }

  setInputValue(text, selRange) {
    if (this.input.value !== text) {
      this.input.value = text;
      this.triggerEvent('onTextChange', { text });
      this.onTextChange();
    }

    if (selRange) {
      this.select(selRange);
    }

    this.updateClear();
  }

  stopEvent(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  select(start, end) {
    if (this.isDisabled() || this.silence) { return; }

    const range = isPlainObject(start) ? start : { start, end };
    CaretUtils.select(this.input, range);
  }

  isSelectAll() {
    const range = this.getSelection();
    return (range.end - range.start === this.input.value.length);
  }

  getSelection(cache = false) {
    return cache ? this.selection : CaretUtils.getCaret(this.input);
  }

  deleteSelection(backSpace) {
    if (!this.allowEdit() || !this.textProvider) {
      return;
    }

    const selRange = this.getSelection();
    backSpace = !!backSpace;
    if (backSpace) {
      if (selRange.end === selRange.start) {
        if (selRange.end >= 1) {
          selRange.end -= 1;
          selRange.start -= 1;
        } else {
          return;
        }
      } else {
        selRange.end -= 1;
      }
    } else {
      selRange.end -= 1;
    }
    if (selRange.end < selRange.start) {
      selRange.end = (selRange.start);
    }
    const rh = new InputResult();
    this.textProvider.remove(selRange.start, selRange.end, rh);
    this.updateText({
      start: rh.testPosition,
      end: rh.testPosition
    });
  }

  updateText(selRange) {
    const text = this.getText();
    this.setInputValue(text, selRange);
  }

  onTextChange() {
  }

  triggerEvent(name, event = {}, src = this) {
    if (this.silence) return;

    if (isFunction(this.props[name])) {
      event.text = this.getText();
      event.srcComponent = src;
      event.target = this.input;
      this.props[name](event);
    }
  }

  focus() {
    if (this.isDisabled()) { return; }
    this.input.focus();
  }

  render() {
    const {
      id,
      name,
      size,
      disabled,
      errored,
      readonly,
      className,
      maxLength,
      style,
      showTrigger = false,
      showTrigger2 = false,
      showSpinner = false,
      textAlign = 'left',
      triggerIcon,
      triggerIconHint,
      triggerIconToggle,
      triggerIcon2,
      triggerIconHint2,
      triggerIconToggle2,
      icon,
      iconHint,
      placeHolder,
      ariaLabel,
      ...rest
    } = this.props;

    const validProps = filterValidCustomProps(rest);
    const ti = `icon ${this.state.triggerToggled ? (triggerIconToggle || triggerIcon) : triggerIcon}`;
    const ti2 = `icon ${this.state.triggerToggled2 ? (triggerIconToggle2 || triggerIcon2) : triggerIcon2}`;
    const tiHint = showTrigger ? triggerIconHint : '';
    const tiHint2 = showTrigger2 ? triggerIconHint2 : '';
    const containerClassName = this.getContainerClassName() || '';
    const stateClassName = this.state.stateClassName || '';
    const buttonCount = this.getButtonCount();

    return (
      <div
        ref={(node) => { this.node = node; }}
        className={cls`
        ${containerClassName}
        ${stateClassName}
        input-group
        ${`buttons-${buttonCount}`}
        ${icon ? 'input-group--icon' : ''}
        ${size ? `input-group--${size}` : ''}
        ${errored ? 'input-group--error' : ''}
        ${disabled ? 'disabled' : ''}
        ${className || ''}`}
        style={style}
      >
        {
          icon &&
          <span className="input-group__item item--icon" title={iconHint}>
            <i className={`icon ${icon}`} /></span>
        }
        <input
          aria-label={ariaLabel}
          {...validProps}
          id={id}
          name={name}
          data-qa-id={this.props['data-qa-id']}
          type="text"
          disabled={disabled}
          readOnly={readonly}
          maxLength={maxLength}
          placeholder={placeHolder}
          className={cls`input
            input-group__field
            textalign-${textAlign}
            input__field `}
          ref={(c) => { this.input = c; }}
          onFocus={e => this.onInputFocus(e)}
          onBlur={e => this.onInputBlur(e)}
          onKeyDown={e => this.onInputKeyDown(e)}
          onKeyUp={e => this.onInputKeyUp(e)}
          onKeyPress={e => this.onInputKeyPress(e)}
          onMouseUp={e => this.onMouseUp(e)}
          onChange={e => this.onInputChange(e)}
          onPaste={e => this.onInputPaste(e)}
          onDragEnter={(e) => { this.stopEvent(e); }}
          onDragOver={(e) => { this.stopEvent(e); }}
          onDrop={(e) => { this.stopEvent(e); }}
        />
        {
          showSpinner &&
          <span className={'input-group__item button-spinner'}>
            <span
              className="arrow-up"
              onMouseDown={e => e.preventDefault()}
              onClick={() => !disabled && this.doSpin(true)}
            />
            <span
              className="arrow-down"
              onMouseDown={e => e.preventDefault()}
              onClick={() => !disabled && this.doSpin(false)}
            />
          </span>
        }
        {
          showTrigger &&
          <a
            className={'input-group__item button-toggler'}
            role="button"
            aria-label={tiHint}
            onMouseDown={e => e.preventDefault()}
            onClick={(e) => {
              if (!disabled) {
                this.onInputFocus(e);
                this.onTriggerClick(e);
              }
              this.stopEvent(e);
              return false;
            }}
            onKeyDown={e => this.handleIconKeyDown(e, 1)}
            tabIndex={disabled ? -1 : 0}
          ><i className={ti} aria-label="chevron icon" /></a>
        }
        {
          showTrigger2 &&
          <a
            className={'input-group__item button-toggler'}
            role="button"
            aria-label={tiHint2}
            onMouseDown={e => e.preventDefault()}
            onClick={(e) => {
              if (!disabled) {
                this.onInputFocus(e);
                this.onTrigger2Click(e);
              }
              this.stopEvent(e);
              return false;
            }}
            onKeyDown={e => this.handleIconKeyDown(e, 2)}
            tabIndex={disabled ? -1 : 0}
          ><i className={ti2} aria-label="chevron icon" /></a>
        }
      </div>
    );
  }
}

export {
  InputBasePropTypes,
  InputBaseProps
};

export default InputBase;
