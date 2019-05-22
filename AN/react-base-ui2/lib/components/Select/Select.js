'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _defineProperty2 = require('babel-runtime/helpers/defineProperty');var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _reactDom = require('react-dom');var _reactDom2 = _interopRequireDefault(_reactDom);
var _xor = require('lodash/xor');var _xor2 = _interopRequireDefault(_xor);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _SelectChoice = require('./SelectChoice');var _SelectChoice2 = _interopRequireDefault(_SelectChoice);
var _SelectOptionMenu = require('./SelectOptionMenu');var _SelectOptionMenu2 = _interopRequireDefault(_SelectOptionMenu);
var _Portal = require('./../Portal');var _Portal2 = _interopRequireDefault(_Portal);
var _dom = require('../../utils/dom');
var _consts = require('../../consts');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var SelectPropTypes = {
  /**
                         * aria label (for assistive tech)
                         */
  'aria-label': _propTypes2.default.string,
  /**
                                             * HTML ID of an element that should be used as the label (for assistive tech)
                                             */
  'aria-labelledby': _propTypes2.default.string,
  prefixCls: _propTypes2.default.string,
  /**
                                          * select option object array to render as option item list by default
                                          */
  optionData: _propTypes2.default.array,
  /**
                                          * option value array to determine which were selected
                                          */
  choiceValues: _propTypes2.default.array,
  /**
                                            * placeholder of search input
                                            */
  placeholder: _propTypes2.default.string,
  /**
                                            * function returns the parent of rendering menu, default is document.body
                                            */
  getMenuContainer: _propTypes2.default.func,
  /**
                                               * clean filter character after select or deselect an option and reset option item list
                                               */
  resetFilterAfterSelect: _propTypes2.default.bool,
  /**
                                                     * Enables users to create new options along with choosing existing options.
                                                     */
  creatable: _propTypes2.default.bool,
  /**
                                        * set filter input value, Only applies when creatable is set to true .
                                        */
  inputValue: _propTypes2.default.string,
  /**
                                           * function to customize rendering a single option item
                                           */
  optionItemRenderer: _propTypes2.default.func,
  /**
                                                 * function to customize rendering the footer section below all option item
                                                 */
  optionFooterRenderer: _propTypes2.default.func,
  /**
                                                   * function to customize rendering the menu of option
                                                   */
  optionMenuRenderer: _propTypes2.default.func,
  /**
                                                 * function to customize the filter logic by inputted search characters
                                                 */
  optionFilterFn: _propTypes2.default.func,
  /**
                                             * onSelect callback function triggered by user select/deselect an option
                                             */
  onSelect: _propTypes2.default.func,
  /**
                                       * onChange callback function triggered by user change selection
                                       */
  onChange: _propTypes2.default.func,
  /**
                                       * onClick callback function triggered by user click on an option
                                       */
  onOptionItemClick: _propTypes2.default.func,
  /**
                                                * function to customize menu width
                                                */
  menuWidth: _propTypes2.default.string,
  /**
                                          * The enable/disable state
                                          */
  disabled: _propTypes2.default.bool,
  /**
                                       * Determines the maximum length of the input value.
                                       */
  inputMaxLength: _propTypes2.default.number,
  /**
                                               * Handler to be called when the input loses focus.
                                               */
  onInputBlur: _propTypes2.default.func,
  /**
                                          * Handler to be called when the input get focus.
                                          */
  onInputFocus: _propTypes2.default.func,
  /**
                                           * Handler to be called before onChange triggered
                                           * and return a value as real new input value.
                                           */
  setInputValue: _propTypes2.default.func };


var SelectDefaultProps = {
  prefixCls: _consts.DefaultCSSPrefix + '-select',
  creatable: false,
  placeholder: '',
  getMenuContainer: function getMenuContainer() {return window.document.body;},
  optionMenuRenderer: function optionMenuRenderer(menu) {return menu;},
  optionFilterFn: function optionFilterFn(options) {var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';return options.filter(function (_ref) {var text = _ref.text;return text.toLowerCase().
      indexOf(value.toLowerCase()) > -1;});},
  resetFilterAfterSelect: true };var


Select = function (_React$Component) {(0, _inherits3.default)(Select, _React$Component);



  function Select(props) {(0, _classCallCheck3.default)(this, Select);var _this = (0, _possibleConstructorReturn3.default)(this, (Select.__proto__ || (0, _getPrototypeOf2.default)(Select)).call(this,
    props));_initialiseProps.call(_this);var _this$props =

    _this.props,choiceValues = _this$props.choiceValues,_this$props$inputValu = _this$props.inputValue,inputValue = _this$props$inputValu === undefined ? '' : _this$props$inputValu;

    _this.state = {
      choiceValues: choiceValues || [],
      open: false,
      inputValue: inputValue };


    _this._focused = false;
    _this._lastInputValue = '';return _this;
  }(0, _createClass3.default)(Select, [{ key: 'componentWillReceiveProps', value: function componentWillReceiveProps(

    nextProps) {var
      choiceValues = nextProps.choiceValues,inputValue = nextProps.inputValue;var
      creatable = this.props.creatable;

      if (creatable && inputValue !== this.state.inputValue) {
        this.setInputValue(inputValue);
      }

      if ((0, _xor2.default)(choiceValues, this.props.choiceValues).length > 0) {
        this.setState({ choiceValues: choiceValues });
      }
    } }, { key: 'componentDidUpdate', value: function componentDidUpdate()

    {
      if (this._inputRef && this._inputRef.value && this._inputMirrorRef) {
        this._inputRef.style.width = '';
        this._inputRef.style.width = this._inputMirrorRef.clientWidth + 10 + 'px';
      } else if (this._inputRef) {
        this._inputRef.style.width = '';
      }var
      inputValue = this.state.inputValue;
      this._lastInputValue = inputValue;
    } }, { key: 'render', value: function render()




































































































































































































































































































































































































    {var _classNames2;var _props =
      this.props,prefixCls = _props.prefixCls,className = _props.className,creatable = _props.creatable,disabled = _props.disabled;
      var placeholderNode = this.renderPlaceholder();
      var selectionNode = this.renderSelection();
      var optionListNode = this.renderOptionMenusByPortal();
      return (
        _react2.default.createElement('div', {
            className:
            (0, _classnames2.default)(prefixCls, className, (0, _defineProperty3.default)({},
            prefixCls + '--creatable', creatable)),


            ref: this.saveContainerRef,
            onClick: this.onSelectionRendererClick },

          _react2.default.createElement('div', {
              className: (0, _classnames2.default)(prefixCls + '-renderer', (_classNames2 = {}, (0, _defineProperty3.default)(_classNames2,
              prefixCls + '-renderer__focused', this._focused), (0, _defineProperty3.default)(_classNames2,
              prefixCls + '-renderer__empty', !this.getPlaceholderHiddenState()), (0, _defineProperty3.default)(_classNames2,
              'is-disabled', disabled), _classNames2)),

              ref: this.saveSelectionRendererRef },

            selectionNode,
            placeholderNode),

          optionListNode));


    } }]);return Select;}(_react2.default.Component);Select.propTypes = SelectPropTypes;Select.defaultProps = SelectDefaultProps;var _initialiseProps = function _initialiseProps() {var _this2 = this;this.onPlaceholderClick = function () {_this2.focus(true);};this.onOptionItemSelect = function (e, value, selectedValues) {clearTimeout(_this2._blurTimer);_this2._blurTimer = null;var _props2 = _this2.props,resetFilterAfterSelect = _props2.resetFilterAfterSelect,onSelect = _props2.onSelect,creatable = _props2.creatable,onChange = _props2.onChange;onSelect && onSelect(value);if (!creatable) {_this2.setChoiceValues(selectedValues, function () {_this2.focus(true);});} else {_this2.setInputValue(selectedValues[0], true);_this2.setOpenState(false);return;}onChange && onChange(selectedValues);resetFilterAfterSelect && _this2.setInputValue('');};this.onOptionItemDeselect = this.onOptionItemSelect;this.onOptionItemClick = function (e, itemInfo) {e.stopPropagation();var onOptionItemClick = _this2.props.onOptionItemClick;onOptionItemClick && onOptionItemClick(e, itemInfo);};this.onChoiceRemove = function (removedValue) {var onChange = _this2.props.onChange;var choiceValues = _this2.state.choiceValues;var nextChoiceValues = choiceValues.filter(function (value) {return value !== removedValue;});_this2.setChoiceValues(nextChoiceValues, function () {clearTimeout(_this2._blurTimer);_this2._blurTimer = null;_this2.focus(true);});onChange && onChange(nextChoiceValues);};this.onInputChange = function (e) {var newInputValue = e.target.value;_this2.setInputValue(newInputValue);_this2.setOpenState(true);};this.onInputKeyDown = function (e) {var keyCode = e.keyCode;var onChange = _this2.props.onChange;var _state = _this2.state,open = _state.open,choiceValues = _state.choiceValues;if (!e.target.value && keyCode === _consts.KeyCode.BACKSPACE) {e.preventDefault();if (choiceValues.length) {choiceValues.splice(-1, 1);var nextChoiceValues = choiceValues.slice(0);_this2.setChoiceValues(nextChoiceValues);onChange && onChange(nextChoiceValues);return;}}if (keyCode === _consts.KeyCode.DOWN) {if (!open) {_this2.setOpenState(true);e.preventDefault();e.stopPropagation();}} else if (keyCode === _consts.KeyCode.ENTER) {e.preventDefault();} else if (keyCode === _consts.KeyCode.ESCAPE) {if (open) {_this2.setOpenState(false);e.preventDefault();e.stopPropagation();}}if (open && _this2._selectionMenuRef) {if (_this2._selectionMenuRef.onKeyDown(e)) {e.preventDefault();e.stopPropagation();}}};this.onSelectionRendererClick = function () {clearTimeout(_this2._blurTimer);_this2._blurTimer = null;var open = _this2.state.open;var disabled = _this2.props.disabled;var nextOpen = !open;if (!disabled) {if (nextOpen && !_this2._focused) {_this2.onInputFocus();}_this2.setOpenState(nextOpen);}};this.onInputBlur = function () {if (_this2._focused) {var selectionMenuDom = _reactDom2.default.findDOMNode(_this2._selectionMenuRef); // eslint-disable-line
      if (selectionMenuDom && selectionMenuDom.contains(document.activeElement)) {_this2._inputRef.focus();_this2._focused = true;return;}_this2._blurTimer = window.setTimeout(function () {_this2._focused = false;_this2.setOpenState(false);_this2.updateFocusClassName();var _props3 = _this2.props,onInputBlur = _props3.onInputBlur,creatable = _props3.creatable;creatable && (0, _isFunction2.default)(onInputBlur) && onInputBlur(_this2.state.selectedVal, _this2.state.inputValue);}, 200);}};this.setInputValue = function (nextInputValue, isItemSelected) {var inputValue = _this2.state.inputValue;var _props4 = _this2.props,onChange = _props4.onChange,creatable = _props4.creatable,setInputValue = _props4.setInputValue;var newInputValue = isItemSelected && (0, _isFunction2.default)(setInputValue) ? setInputValue(nextInputValue) : nextInputValue;var selectedVal = isItemSelected ? nextInputValue : null;if (nextInputValue !== inputValue) {_this2.setState({ inputValue: newInputValue, selectedVal: selectedVal }, function () {creatable && onChange && onChange(nextInputValue);});}};this.setOpenState = function (nextOpen) {var open = _this2.state.open;var creatable = _this2.props.creatable;if (nextOpen === open) {_this2.focus(nextOpen);return;}var nextState = { open: nextOpen };if (!nextOpen && !creatable) {_this2.setInputValue('');}_this2.setState(nextState, function () {nextOpen && _this2.focus(nextOpen);});};this.setChoiceValues = function (nextChoiceValues, callback) {if ('choiceValues' in _this2.props) {return callback && callback();}return _this2.setState({ choiceValues: nextChoiceValues }, callback);};this.getPlaceholderHiddenState = function () {var _state2 = _this2.state,choiceValues = _state2.choiceValues,inputValue = _state2.inputValue;return choiceValues.length || inputValue;};this.getPortalContainer = function () {var getMenuContainer = _this2.props.getMenuContainer;var parent = getMenuContainer();var portalContainer = document.createElement('div');portalContainer.style.position = 'absolute';portalContainer.style.top = '0';portalContainer.style.left = '0';portalContainer.style.width = '100%';parent && parent.appendChild(portalContainer);return portalContainer;};this.updateFocusClassName = function () {var prefixCls = _this2.props.prefixCls;var focusClass = prefixCls + '-renderer__focused';if (_this2._focused) {(0, _dom.addClass)(_this2._selectionRendererRef, focusClass);} else {(0, _dom.removeClass)(_this2._selectionRendererRef, focusClass);}};this.onInputFocus = function () {var _props5 = _this2.props,creatable = _props5.creatable,onInputFocus = _props5.onInputFocus;_this2._focused = true;_this2.updateFocusClassName();creatable && (0, _isFunction2.default)(onInputFocus) && onInputFocus();};this.filterOption = function () {var inputValue = _this2.state.inputValue;var _props6 = _this2.props,optionData = _props6.optionData,optionFilterFn = _props6.optionFilterFn;return optionFilterFn(optionData, inputValue);};this.saveContainerRef = function (node) {_this2._containerRef = node;};this.saveSelectionRendererRef = function (node) {_this2._selectionRendererRef = node;};this.saveSelectionMenuRef = function (node) {_this2._selectionMenuRef = node;};this.saveInputRef = function (node) {_this2._inputRef = node;};this.saveInputMirrorRef = function (node) {_this2._inputMirrorRef = node;};this.focus = function (open) {if (open) {var _document = document,activeElement = _document.activeElement;if (_this2._inputRef && _this2._inputRef !== activeElement) {_this2._inputRef.focus();_this2._focused = true;}}};this.calculateOptionMenuPosition = function () {var getMenuContainer = _this2.props.getMenuContainer;var containerRect = _this2._containerRef.getBoundingClientRect();var scroller = getMenuContainer();var scrollerRect = scroller.getBoundingClientRect();var top = containerRect.top + containerRect.height + scroller.scrollTop - scrollerRect.top;var left = containerRect.left + scroller.scrollLeft - scrollerRect.left;return { top: top + 'px', left: left + 'px' };};this.renderPlaceholder = function () {var _props7 = _this2.props,prefixCls = _props7.prefixCls,placeholder = _props7.placeholder;var hidden = _this2.getPlaceholderHiddenState();return !hidden && _react2.default.createElement('div', { className: prefixCls + '-placeholder', onClick: _this2.onPlaceholderClick }, placeholder);};this.renderChoices = function () {var _props8 = _this2.props,prefixCls = _props8.prefixCls,optionData = _props8.optionData;var choiceValues = _this2.state.choiceValues;var availableChoiceValues = choiceValues.filter(function (value) {return optionData.filter(function (option) {return option.value === value;}).length;});var choiceOptions = availableChoiceValues.map(function (value) {return optionData.filter(function (option) {return option.value === value;})[0];});return choiceOptions.map(function (choice, index) {return _react2.default.createElement(_SelectChoice2.default, (0, _extends3.default)({ key: 'choice-' + choice.value, prefixCls: prefixCls, last: index + 1 === choiceOptions.length }, choice, { onChoiceRemove: _this2.onChoiceRemove }));});};this.renderFilterInput = function () {var _props9 = _this2.props,prefixCls = _props9.prefixCls,disabled = _props9.disabled,inputMaxLength = _props9.inputMaxLength;var inputValue = _this2.state.inputValue;var filterInputPrefixCls = prefixCls + '-search';var ariaAttributes = { 'aria-autocomplete': 'list', 'aria-label': _this2.props['aria-label'], 'aria-labelledby': _this2.props['aria-labelledby'] };return _react2.default.createElement('li', { className: '' + filterInputPrefixCls }, _react2.default.createElement('div', { className: filterInputPrefixCls + '__container' }, _react2.default.createElement('input', (0, _extends3.default)({ ref: _this2.saveInputRef, value: inputValue, type: 'text', className: filterInputPrefixCls + '__field', autoComplete: false, onChange: _this2.onInputChange, onKeyDown: disabled ? undefined : _this2.onInputKeyDown, onFocus: _this2.onInputFocus, onBlur: _this2.onInputBlur, disabled: disabled }, ariaAttributes, { maxLength: inputMaxLength })), _react2.default.createElement('span', { className: filterInputPrefixCls + '__field-mirror', ref: _this2.saveInputMirrorRef }, inputValue, '\xA0')));};this.renderSelection = function () {var prefixCls = _this2.props.prefixCls;var choiceNodes = _this2.renderChoices();var inputNode = _this2.renderFilterInput();return _react2.default.createElement('div', { className: prefixCls + '-selection' }, _react2.default.createElement('ul', null, choiceNodes, inputNode));};this.renderOptionMenu = function () {var _props10 = _this2.props,prefixCls = _props10.prefixCls,menuWidth = _props10.menuWidth,optionItemRenderer = _props10.optionItemRenderer,optionFooterRenderer = _props10.optionFooterRenderer,optionMenuRenderer = _props10.optionMenuRenderer;var _state3 = _this2.state,choiceValues = _state3.choiceValues,open = _state3.open,inputValue = _state3.inputValue;var filteredOptionData = _this2.filterOption(); /* istanbul ignore next */var popupMenuWidth = _this2._containerRef && !menuWidth ? _this2._containerRef.offsetWidth : menuWidth;var menuProps = { prefixCls: prefixCls, hidden: !open, optionData: filteredOptionData, selectedValues: choiceValues, optionItemRenderer: optionItemRenderer, optionFooterRenderer: optionFooterRenderer, ref: _this2.saveSelectionMenuRef, onOptionItemSelect: _this2.onOptionItemSelect, onOptionItemDeselect: _this2.onOptionItemDeselect, onOptionItemClick: _this2.onOptionItemClick, calculateOptionMenuPosition: _this2.calculateOptionMenuPosition };if (inputValue !== _this2._lastInputValue && filteredOptionData.length) {menuProps.activeValue = filteredOptionData[0].value;}menuProps.style = { width: popupMenuWidth };var menuNode = _react2.default.createElement(_SelectOptionMenu2.default, menuProps);if (optionMenuRenderer) {return optionMenuRenderer(menuNode, menuProps);}return null;};this.renderOptionMenusByPortal = function () {var open = _this2.state.open;if (open) {return _react2.default.createElement(_Portal2.default, { getContainer: _this2.getPortalContainer }, _this2.renderOptionMenu());}return null;};};exports.default =

Select;module.exports = exports['default'];