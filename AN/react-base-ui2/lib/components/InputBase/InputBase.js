'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.InputBaseProps = exports.InputBasePropTypes = undefined;var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _templateObject = (0, _taggedTemplateLiteral3.default)(['', '-list-wrapper input-list-wrapper ', ''], ['', '-list-wrapper input-list-wrapper ', '']),_templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n        ', '\n        ', '\n        input-group\n        ', '\n        ', '\n        ', '\n        ', '\n        ', '\n        ', ''], ['\n        ', '\n        ', '\n        input-group\n        ', '\n        ', '\n        ', '\n        ', '\n        ', '\n        ', '']),_templateObject3 = (0, _taggedTemplateLiteral3.default)(['input\n            input-group__field\n            textalign-', '\n            input__field '], ['input\n            input-group__field\n            textalign-', '\n            input__field ']);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _isPlainObject = require('lodash/isPlainObject');var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
var _findIndex = require('lodash/findIndex');var _findIndex2 = _interopRequireDefault(_findIndex);
var _isNil = require('lodash/isNil');var _isNil2 = _interopRequireDefault(_isNil);
var _isEmpty = require('lodash/isEmpty');var _isEmpty2 = _interopRequireDefault(_isEmpty);
var _toString = require('lodash/toString');var _toString2 = _interopRequireDefault(_toString);
var _identity = require('lodash/identity');var _identity2 = _interopRequireDefault(_identity);
var _throttle = require('lodash/throttle');var _throttle2 = _interopRequireDefault(_throttle);
var _map = require('lodash/map');var _map2 = _interopRequireDefault(_map);
var _isEqual = require('lodash/isEqual');var _isEqual2 = _interopRequireDefault(_isEqual);
var _reactIntl = require('react-intl');

var _decoration = require('../../services/decoration');
var _caret = require('../../utils/caret');var _caret2 = _interopRequireDefault(_caret);
var _cls = require('../../utils/cls');var _cls2 = _interopRequireDefault(_cls);
var _utils = require('../../utils');
var _InputResult = require('./InputResult');var _InputResult2 = _interopRequireDefault(_InputResult);
var _SpinSpeed = require('./consts/SpinSpeed');var SpinSpeed = _interopRequireWildcard(_SpinSpeed);

var _List = require('../List');var _List2 = _interopRequireDefault(_List);
var _consts = require('../../consts');function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

bool = _propTypes2.default.bool,string = _propTypes2.default.string,number = _propTypes2.default.number,object = _propTypes2.default.object,oneOfType = _propTypes2.default.oneOfType,func = _propTypes2.default.func,oneOf = _propTypes2.default.oneOf,array = _propTypes2.default.array;

/* eslint react/sort-comp: 0 */
/* eslint-disable  react/no-unused-prop-types */
/* eslint-disable  react/forbid-prop-types */
/* eslint-disable  no-nested-ternary */

/** Default PropTypes of InputBase.
                                         * @memberof InputBase
                                        */
var InputBasePropTypes = {
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
  ariaLabel: string };


/** Default Props for InputBase class */
var InputBaseProps = {
  id: '',
  name: '',
  size: 'md',
  'data-qa-id': '',
  prefix: '' + _consts.DefaultCSSPrefix,
  disabled: false,
  value: '',
  className: '',
  listClassName: '',
  listWidth: 'auto',
  listMaxHeight: '300px',
  listConfig: {},
  listPopupOptions: {},
  onListOpen: _identity2.default,
  onListClose: _identity2.default,
  items: [],
  placeHolder: '',
  onTextChange: _identity2.default,
  onFocus: _identity2.default,
  onBlur: _identity2.default,
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
  ariaLabel: 'Input box' };


/** Base class for all Input components */var
InputBase = function (_React$PureComponent) {(0, _inherits3.default)(InputBase, _React$PureComponent);








  function InputBase(props) {(0, _classCallCheck3.default)(this, InputBase);var _this = (0, _possibleConstructorReturn3.default)(this, (InputBase.__proto__ || (0, _getPrototypeOf2.default)(InputBase)).call(this,
    props));

    _this.textProvider = _this.createTextProvider();
    _this.silence = false;
    _this.spinCount = 0;
    _this.spinFuncs = {};
    _this.spinFuncs[SpinSpeed.FAST] = (0, _throttle2.default)(_this.doSpin, 50).bind(_this);
    _this.spinFuncs[SpinSpeed.MEDIUM] = (0, _throttle2.default)(_this.doSpin, 100).bind(_this);
    _this.spinFuncs[SpinSpeed.SLOW] = (0, _throttle2.default)(_this.doSpin, 200).bind(_this);var

    value = props.value,items = props.items;
    _this.state = {
      defaultValue: value || '',
      triggerToggled: false,
      triggerToggled2: false,
      stateClassName: '' };


    _this.selection = { start: 0, end: 0 };
    _this.listItems = _this.createListItems(items);return _this;
  }(0, _createClass3.default)(InputBase, [{ key: 'componentDidMount', value: function componentDidMount()

    {var _this2 = this;
      this.preText = this.input.value;

      if (this.allowClear()) {
        var paddingRight = this.getButtonCount() * 24;

        this.clearable = (0, _decoration.enableClearable)(this.input, {
          trigger: _consts.Trigger.FOCUS,
          paddingRight: paddingRight,
          onClear: function onClear() {
            _this2.onClear();
            _this2.updateClear();
          } });

      }

      var onMouseWheel = function onMouseWheel(e, delta) {var _props$allowMouseSpin =
        _this2.props.allowMouseSpin,allowMouseSpin = _props$allowMouseSpin === undefined ? false : _props$allowMouseSpin;
        if (allowMouseSpin) {
          delta = delta || e.deltaY;
          if (delta !== 0) {
            _this2.onSpin(delta > 0, false);
          }
        }
      };

      var mh = (0, _throttle2.default)(onMouseWheel, 100);
      this.input.addEventListener('wheel', mh, false);

      this.updateText();
    } }, { key: 'componentWillUnmount', value: function componentWillUnmount()

    {
      (0, _decoration.disableClearable)(this.input);
    } }, { key: 'updateValue', value: function updateValue(

    preValue, nextValue) {
      this.setText(nextValue);
    } }, { key: 'componentWillReceiveProps', value: function componentWillReceiveProps(

    nextProps, nextContext) {var _props =




      this.props,preCurrency = _props.currency,preItems = _props.items,preValue = _props.value;var


      nextCurrency =


      nextProps.currency,nextItems = nextProps.items,nextValue = nextProps.value;

      if (this.textProvider && preCurrency !== nextCurrency) {
        this.textProvider.setCurrency(nextCurrency);
      }

      if (!(0, _isEqual2.default)(preValue, nextValue)) {
        this.updateValue(preValue, nextValue);
      }

      if (!(0, _isEqual2.default)(preItems, nextItems)) {
        this.listItems = this.createListItems(nextItems);
      }var _context$intl =

      this.context.intl,intl = _context$intl === undefined ? null : _context$intl;var _nextContext$intl =
      nextContext.intl,nextIntl = _nextContext$intl === undefined ? null : _nextContext$intl;

      var intlChanged = nextIntl !== intl || preCurrency !== nextCurrency;
      if (intlChanged) {
        this.updateText();
      }
    } }, { key: 'createListItems', value: function createListItems(

    items) {
      var listItems = (0, _map2.default)(items, function (item, index) {return (0, _extends3.default)({},
        item, {
          index: index });});


      return listItems;
    } }, { key: 'getListItemText', value: function getListItemText(

    item) {
      var text = item.text;
      if ((0, _isNil2.default)(text)) {
        text = item.value || '';
      }

      return (0, _toString2.default)(text);
    } }, { key: 'onListSelected', value: function onListSelected(

    indexes) {
      if ((0, _isEmpty2.default)(this.listItems) || (0, _isEmpty2.default)(indexes)) {
        return;
      }

      var i = indexes[0];
      if (i >= 0) {
        var item = this.listItems[i];
        if (item) {
          var text = this.getListItemText(item);
          this.setText(text);
        }
      }
    } }, { key: 'findInList', value: function findInList()

    {var _this3 = this;
      var text = this.getText();
      if (!text || (0, _isEmpty2.default)(this.listItems)) {
        return [-1];
      }

      var index = (0, _findIndex2.default)(this.listItems, function (item) {return text === _this3.getListItemText(item);});
      return [index];
    } }, { key: 'onListOpen', value: function onListOpen()

    {
      this.triggerEvent('onListOpen');
    } }, { key: 'onListClose', value: function onListClose()

    {
      this.triggerEvent('onListClose');
    } }, { key: 'popupList', value: function popupList()

    {var _this4 = this;
      if ((0, _isEmpty2.default)(this.listItems)) {
        return;
      }var _props2 =











      this.props,textAlign = _props2.textAlign,onListRender = _props2.onListRender,listMaxHeight = _props2.listMaxHeight,listWidth = _props2.listWidth,listMinWidth = _props2.listMinWidth,listClassName = _props2.listClassName,prefix = _props2.prefix,listConfig = _props2.listConfig,listPopupOptions = _props2.listPopupOptions;

      var target = this.input;
      var listOptions = {
        data: this.listItems,
        config: (0, _extends3.default)({
          selectionMode: _List.SelectionMode.SINGLE,
          listType: _List.ListType.SINGLE,
          disabled: false,
          showCheckAll: false,
          checkable: false,
          asyncable: false,
          maxHeight: '' + listMaxHeight,
          focused: false,
          showTips: true,
          WCAG: true },
        listConfig),

        className: (0, _cls2.default)(_templateObject, prefix, listClassName),
        selectedIndex: this.findInList(),
        style: {
          width: listWidth ? '' + listWidth : this.input.offsetWidth + 'px',
          minWidth: listMinWidth ? '' + listMinWidth : this.input.offsetWidth + 'px' },

        renderer: onListRender,
        onChange: function onChange(v) {
          _this4.onListSelected(v);
          _this4.triggerEvent('onListSelected', v);
          if (_this4.list) {
            _this4.list.cancel();
          }
        } };


      var dockStyle = textAlign === 'left' ? _consts.Dock.BOTTOM_LEFT : _consts.Dock.BOTTOM_RIGHT;
      var popupOptions = (0, _extends3.default)({
        target: target,
        showShadow: false,
        distance: 4,
        dockStyle: dockStyle,
        closeByEscape: true,
        focus: true },
      listPopupOptions);


      try {
        var list = _List2.default.popup(listOptions, popupOptions);
        if (list !== this.list) {
          this.list = list;
          this.onListOpen();
        }
        list.result.then(function () {
          _this4.onListClose();
        }).catch(function () {
          _this4.onListClose();
        });
      } catch (e) {
        console.log(e);
      }
    } }, { key: 'isDegradeMode', value: function isDegradeMode()

    {
      return false;
    } }, { key: 'getContainerClassName', value: function getContainerClassName()

    {
      return '';
    } }, { key: 'createTextProvider', value: function createTextProvider()

    {
      return null;
    } }, { key: 'allowEdit', value: function allowEdit()

    {
      return !(this.isReadOnly() || this.isDisabled());
    } }, { key: 'isReadOnly', value: function isReadOnly()

    {
      return !!this.input.readOnly;
    } }, { key: 'isDisabled', value: function isDisabled()

    {
      return !!this.input.disabled;
    } }, { key: 'isFocused', value: function isFocused()

    {
      return this.input === document.activeElement;
    } }, { key: 'isBlank', value: function isBlank()

    {
      return false;
    } }, { key: 'getSpinSpeed', value: function getSpinSpeed()

    {
      this.spinCount += 1;
      if (this.spinCount > 10) {
        return SpinSpeed.FAST;
      } else if (this.spinCount > 4) {
        return SpinSpeed.MEDIUM;
      }

      return SpinSpeed.SLOW;
    } }, { key: 'onSpin', value: function onSpin()

    {var up = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!this.allowEdit() || !this.textProvider) {return;}

      var speed = this.getSpinSpeed();
      var ds = this.spinFuncs[speed];
      if (ds) {
        ds(up);
      }
    } }, { key: 'doSpin', value: function doSpin()

    {
    } }, { key: 'stopSpin', value: function stopSpin()

    {
      this.spinCount = 0;
    }

    // Special handling if IME has problem or does not follow events order standard
  }, { key: 'onIMEBreakThrough', value: function onIMEBreakThrough() {
    } }, { key: 'onKeyPressPreview', value: function onKeyPressPreview()

    {
      return false;
    } }, { key: 'onKeyDownPreview', value: function onKeyDownPreview()

    {
      return false; // true means handled.
    } }, { key: 'doInput', value: function doInput(

    ch) {
      var selRange = this.getSelection(true);
      if (selRange.start < selRange.end) {
        this.textProvider.remove(selRange.start, selRange.end - 1);
      }

      var rh = new _InputResult2.default();
      var result = this.textProvider.insertAt(ch, selRange.start, rh);
      if (result) {
        this.updateText({
          start: rh.testPosition,
          end: rh.testPosition });

      } else {
        this.triggerEvent('onInvalidInput', { value: ch });
      }
    } }, { key: 'handleIconKeyDown', value: function handleIconKeyDown(

    e, iconIndex) {
      var key = e.keyCode || e.which;

      if (this.isDisabled()) {
        if (key !== _consts.KeyCode.TAB) {
          this.stopEvent(e);
        }
        return;
      }

      if (key === _consts.KeyCode.ENTER ||
      key === _consts.KeyCode.SPACE ||
      key === _consts.KeyCode.UP ||
      key === _consts.KeyCode.DOWN) {
        if (iconIndex === 1) {
          this.onTriggerClick();
        } else if (iconIndex === 2) {
          this.onTrigger2Click();
        }
        this.stopEvent(e);
      }
    }

    // --Handlers for inner Input-------------------------
  }, { key: 'onInputFocus', value: function onInputFocus(e) {
      this.updateClear();
      this.triggerEvent('onEnter', e);
      this.triggerEvent('onFocus', e);
    } }, { key: 'onInputBlur', value: function onInputBlur(

    e) {
      this.syncText();
      this.updateClear();
      e.text = e.text || this.input.value;
      this.triggerEvent('onBlur', e);
      this.triggerEvent('onLeave', e);
    } }, { key: 'onInputKeyDown', value: function onInputKeyDown(

    e) {
      if (this.isDegradeMode() || !this.textProvider) {
        this.triggerEvent('onKeyDown', e);
        return;
      }

      this.typing = false;
      this.inputed = false;
      this.selection = _caret2.default.getCaret(this.input);
      var keyCode = e.keyCode || e.which;

      if (!this.allowEdit() || this.onKeyDownPreview(e)) {
        if (keyCode !== _consts.KeyCode.TAB) {
          this.stopEvent(e);
        }
        return;
      }

      this.typing = true;
      if (e.ctrlKey || e.altKey || e.metaKey) {return;}var _props$allowKeySpin =

      this.props.allowKeySpin,allowKeySpin = _props$allowKeySpin === undefined ? false : _props$allowKeySpin;
      switch (keyCode) {
        case _consts.KeyCode.UP:
          if (allowKeySpin) {
            this.onSpin(true);
            this.stopEvent(e);
            this.typing = false;
          }
          break;
        case _consts.KeyCode.DOWN:
          if (allowKeySpin) {
            this.onSpin(false);
            this.stopEvent(e);
            this.typing = false;
          }
          break;
        case _consts.KeyCode.BACKSPACE:
          this.deleteSelection(true);
          this.stopEvent(e);
          this.typing = false;
          break;
        case _consts.KeyCode.DELETE:
          this.deleteSelection(false);
          this.stopEvent(e);
          this.typing = false;
          break;
        default:
          break;}

    } }, { key: 'onInputKeyUp', value: function onInputKeyUp(

    e) {
      if (this.isDegradeMode() || !this.textProvider) {
        this.triggerEvent('onKeyUp', e);
        return;
      }

      var keyCode = e.keyCode || e.which;
      if (keyCode === _consts.KeyCode.ENTER || keyCode === _consts.KeyCode.ESCAPE) {return;}
      if (keyCode === _consts.KeyCode.UP || keyCode === _consts.KeyCode.DOWN) {
        this.stopSpin();
      }
      this.stopEvent(e);
      this.typing = false;
      this.inputed = false;
    } }, { key: 'onInputKeyPress', value: function onInputKeyPress(

    e) {
      if (this.isDegradeMode() || !this.textProvider) {
        this.triggerEvent('onKeyPress', e);
        return;
      }

      e.persist();
      var nativeEvent = e.nativeEvent ? e.nativeEvent : e;

      if (nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) {return;}

      /*
                                                                                        nativeEvent.char  - IE11
                                                                                        nativeEvent.key   - Chrome， Safari, FF
                                                                                        nativeEvent.data  - Safari (IME)
                                                                                      */
      var ch = nativeEvent.char || nativeEvent.key || nativeEvent.data || e.key || e.data;
      if (ch && !this.onKeyPressPreview(ch)) {
        this.doInput(ch);
      }

      this.inputed = true;
      this.stopEvent(e);
    } }, { key: 'onMouseUp', value: function onMouseUp(

    e) {
      if (!this.textProvider) {
        this.triggerEvent('onMouseUp', e);
      }
    } }, { key: 'onInputChange', value: function onInputChange(

    e) {
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
    } }, { key: 'onInputPaste', value: function onInputPaste(

    e) {
      if (this.isDegradeMode() || !this.textProvider) {
        this.triggerEvent('onPaste', e);
        return;
      }

      this.stopEvent(e);
      var clipboardData = e.clipboardData || window.clipboardData;
      var text = clipboardData.getData('Text');
      if (text) {
        if (this.isBlank() || this.isSelectAll()) {
          this.setText(text);
        } else {
          this.doInput(text);
        }
      }
    } }, { key: 'getButtonCount', value: function getButtonCount()

    {var _props3 =




      this.props,_props3$showTrigger = _props3.showTrigger,showTrigger = _props3$showTrigger === undefined ? false : _props3$showTrigger,_props3$showTrigger2 = _props3.showTrigger2,showTrigger2 = _props3$showTrigger2 === undefined ? false : _props3$showTrigger2,_props3$showSpinner = _props3.showSpinner,showSpinner = _props3$showSpinner === undefined ? false : _props3$showSpinner;

      var buttonCount = 0 + (showTrigger ? 1 : 0) + (showTrigger2 ? 1 : 0) + (showSpinner ? 1 : 0);
      return buttonCount;
    }

    //--------------------------------
  }, { key: 'syncText', value: function syncText()
    {
      if (this.input && this.textProvider) {
        var val = this.input.value;
        var txt = this.getText();
        if (txt !== val) {
          this.setText(val);
        }
      }
    } }, { key: 'onTriggerClick', value: function onTriggerClick()

    {
      this.popupList();
    } }, { key: 'getProviderOptions', value: function getProviderOptions()

    {
      return {};
    } }, { key: 'getText', value: function getText()

    {
      if (!this.textProvider) {return this.input.value;}

      var options = this.getProviderOptions();
      return this.textProvider.getText(options);
    } }, { key: 'setText', value: function setText(

    text) {
      if (!this.textProvider) {
        this.setInputValue(text);
      } else {
        this.textProvider.setText(text);
        this.updateText();
        this.onTextChange();
      }
    } }, { key: 'allowClear', value: function allowClear()

    {var _props4 =
      this.props,allowBlank = _props4.allowBlank,showClear = _props4.showClear;
      return allowBlank && showClear;
    } }, { key: 'updateClear', value: function updateClear()

    {
      if (this.clearable) {
        var val = this.input.value;
        if (val && this.isFocused()) {
          this.clearable.show();
        } else {
          this.clearable.hide();
        }
      }
    } }, { key: 'onClear', value: function onClear()

    {
    } }, { key: 'setInputValue', value: function setInputValue(

    text, selRange) {
      if (this.input.value !== text) {
        this.input.value = text;
        this.triggerEvent('onTextChange', { text: text });
        this.onTextChange();
      }

      if (selRange) {
        this.select(selRange);
      }

      this.updateClear();
    } }, { key: 'stopEvent', value: function stopEvent(

    e) {
      e.stopPropagation();
      e.preventDefault();
    } }, { key: 'select', value: function select(

    start, end) {
      if (this.isDisabled() || this.silence) {return;}

      var range = (0, _isPlainObject2.default)(start) ? start : { start: start, end: end };
      _caret2.default.select(this.input, range);
    } }, { key: 'isSelectAll', value: function isSelectAll()

    {
      var range = this.getSelection();
      return range.end - range.start === this.input.value.length;
    } }, { key: 'getSelection', value: function getSelection()

    {var cache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return cache ? this.selection : _caret2.default.getCaret(this.input);
    } }, { key: 'deleteSelection', value: function deleteSelection(

    backSpace) {
      if (!this.allowEdit() || !this.textProvider) {
        return;
      }

      var selRange = this.getSelection();
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
        selRange.end = selRange.start;
      }
      var rh = new _InputResult2.default();
      this.textProvider.remove(selRange.start, selRange.end, rh);
      this.updateText({
        start: rh.testPosition,
        end: rh.testPosition });

    } }, { key: 'updateText', value: function updateText(

    selRange) {
      var text = this.getText();
      this.setInputValue(text, selRange);
    } }, { key: 'onTextChange', value: function onTextChange()

    {
    } }, { key: 'triggerEvent', value: function triggerEvent(

    name) {var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var src = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;
      if (this.silence) return;

      if ((0, _isFunction2.default)(this.props[name])) {
        event.text = this.getText();
        event.srcComponent = src;
        event.target = this.input;
        this.props[name](event);
      }
    } }, { key: 'focus', value: function focus()

    {
      if (this.isDisabled()) {return;}
      this.input.focus();
    } }, { key: 'render', value: function render()

    {var _this5 = this;var _props5 =

























      this.props,id = _props5.id,name = _props5.name,size = _props5.size,disabled = _props5.disabled,errored = _props5.errored,readonly = _props5.readonly,className = _props5.className,maxLength = _props5.maxLength,style = _props5.style,_props5$showTrigger = _props5.showTrigger,showTrigger = _props5$showTrigger === undefined ? false : _props5$showTrigger,_props5$showTrigger2 = _props5.showTrigger2,showTrigger2 = _props5$showTrigger2 === undefined ? false : _props5$showTrigger2,_props5$showSpinner = _props5.showSpinner,showSpinner = _props5$showSpinner === undefined ? false : _props5$showSpinner,_props5$textAlign = _props5.textAlign,textAlign = _props5$textAlign === undefined ? 'left' : _props5$textAlign,triggerIcon = _props5.triggerIcon,triggerIconHint = _props5.triggerIconHint,triggerIconToggle = _props5.triggerIconToggle,triggerIcon2 = _props5.triggerIcon2,triggerIconHint2 = _props5.triggerIconHint2,triggerIconToggle2 = _props5.triggerIconToggle2,icon = _props5.icon,iconHint = _props5.iconHint,placeHolder = _props5.placeHolder,ariaLabel = _props5.ariaLabel,rest = (0, _objectWithoutProperties3.default)(_props5, ['id', 'name', 'size', 'disabled', 'errored', 'readonly', 'className', 'maxLength', 'style', 'showTrigger', 'showTrigger2', 'showSpinner', 'textAlign', 'triggerIcon', 'triggerIconHint', 'triggerIconToggle', 'triggerIcon2', 'triggerIconHint2', 'triggerIconToggle2', 'icon', 'iconHint', 'placeHolder', 'ariaLabel']);

      var validProps = (0, _utils.filterValidCustomProps)(rest);
      var ti = 'icon ' + (this.state.triggerToggled ? triggerIconToggle || triggerIcon : triggerIcon);
      var ti2 = 'icon ' + (this.state.triggerToggled2 ? triggerIconToggle2 || triggerIcon2 : triggerIcon2);
      var tiHint = showTrigger ? triggerIconHint : '';
      var tiHint2 = showTrigger2 ? triggerIconHint2 : '';
      var containerClassName = this.getContainerClassName() || '';
      var stateClassName = this.state.stateClassName || '';
      var buttonCount = this.getButtonCount();

      return (
        _react2.default.createElement('div', {
            ref: function ref(node) {_this5.node = node;},
            className: (0, _cls2.default)(_templateObject2,
            containerClassName,
            stateClassName, 'buttons-' +

            buttonCount,
            icon ? 'input-group--icon' : '',
            size ? 'input-group--' + size : '',
            errored ? 'input-group--error' : '',
            disabled ? 'disabled' : '',
            className || ''),
            style: style },


          icon &&
          _react2.default.createElement('span', { className: 'input-group__item item--icon', title: iconHint },
            _react2.default.createElement('i', { className: 'icon ' + icon })),

          _react2.default.createElement('input', (0, _extends3.default)({
            'aria-label': ariaLabel },
          validProps, {
            id: id,
            name: name,
            'data-qa-id': this.props['data-qa-id'],
            type: 'text',
            disabled: disabled,
            readOnly: readonly,
            maxLength: maxLength,
            placeholder: placeHolder,
            className: (0, _cls2.default)(_templateObject3,

            textAlign),

            ref: function ref(c) {_this5.input = c;},
            onFocus: function onFocus(e) {return _this5.onInputFocus(e);},
            onBlur: function onBlur(e) {return _this5.onInputBlur(e);},
            onKeyDown: function onKeyDown(e) {return _this5.onInputKeyDown(e);},
            onKeyUp: function onKeyUp(e) {return _this5.onInputKeyUp(e);},
            onKeyPress: function onKeyPress(e) {return _this5.onInputKeyPress(e);},
            onMouseUp: function onMouseUp(e) {return _this5.onMouseUp(e);},
            onChange: function onChange(e) {return _this5.onInputChange(e);},
            onPaste: function onPaste(e) {return _this5.onInputPaste(e);},
            onDragEnter: function onDragEnter(e) {_this5.stopEvent(e);},
            onDragOver: function onDragOver(e) {_this5.stopEvent(e);},
            onDrop: function onDrop(e) {_this5.stopEvent(e);} })),


          showSpinner &&
          _react2.default.createElement('span', { className: 'input-group__item button-spinner' },
            _react2.default.createElement('span', {
              className: 'arrow-up',
              onMouseDown: function onMouseDown(e) {return e.preventDefault();},
              onClick: function onClick() {return !disabled && _this5.doSpin(true);} }),

            _react2.default.createElement('span', {
              className: 'arrow-down',
              onMouseDown: function onMouseDown(e) {return e.preventDefault();},
              onClick: function onClick() {return !disabled && _this5.doSpin(false);} })),




          showTrigger &&
          _react2.default.createElement('a', {
              className: 'input-group__item button-toggler',
              role: 'button',
              'aria-label': tiHint,
              onMouseDown: function onMouseDown(e) {return e.preventDefault();},
              onClick: function onClick(e) {
                if (!disabled) {
                  _this5.onInputFocus(e);
                  _this5.onTriggerClick(e);
                }
                _this5.stopEvent(e);
                return false;
              },
              onKeyDown: function onKeyDown(e) {return _this5.handleIconKeyDown(e, 1);},
              tabIndex: disabled ? -1 : 0 },
            _react2.default.createElement('i', { className: ti, 'aria-label': 'chevron icon' })),


          showTrigger2 &&
          _react2.default.createElement('a', {
              className: 'input-group__item button-toggler',
              role: 'button',
              'aria-label': tiHint2,
              onMouseDown: function onMouseDown(e) {return e.preventDefault();},
              onClick: function onClick(e) {
                if (!disabled) {
                  _this5.onInputFocus(e);
                  _this5.onTrigger2Click(e);
                }
                _this5.stopEvent(e);
                return false;
              },
              onKeyDown: function onKeyDown(e) {return _this5.handleIconKeyDown(e, 2);},
              tabIndex: disabled ? -1 : 0 },
            _react2.default.createElement('i', { className: ti2, 'aria-label': 'chevron icon' }))));



    } }]);return InputBase;}(_react2.default.PureComponent);InputBase.displayName = 'InputBase';InputBase.defaultProps = InputBaseProps;InputBase.propTypes = InputBasePropTypes;InputBase.contextTypes = { intl: _reactIntl.intlShape };exports.



InputBasePropTypes = InputBasePropTypes;exports.
InputBaseProps = InputBaseProps;exports.default =


InputBase;