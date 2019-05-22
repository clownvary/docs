'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _defineProperty2 = require('babel-runtime/helpers/defineProperty');var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);var _getIterator2 = require('babel-runtime/core-js/get-iterator');var _getIterator3 = _interopRequireDefault(_getIterator2);var _findIndex = require('babel-runtime/core-js/array/find-index');var _findIndex2 = _interopRequireDefault(_findIndex);var _keys = require('babel-runtime/core-js/object/keys');var _keys2 = _interopRequireDefault(_keys);var _defineProperties = require('babel-runtime/core-js/object/define-properties');var _defineProperties2 = _interopRequireDefault(_defineProperties);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');
var _v = require('uuid/v4');var _v2 = _interopRequireDefault(_v);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _debounce = require('lodash/debounce');var _debounce2 = _interopRequireDefault(_debounce);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _utils = require('../../utils');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                   * Default PropTypes of Dropdown.
                                                                                                                                   */
var DropdownPropTypes = {
  /**
                           * Custom class name.
                           */
  className: _propTypes.string,
  /**
                                 * Dropdown value.
                                 */
  value: (0, _propTypes.oneOfType)([_propTypes.string, _propTypes.number]),
  /**
                                                                             * Dropdown default value.
                                                                             */
  defaultValue: (0, _propTypes.oneOfType)([_propTypes.string, _propTypes.number]),
  /**
                                                                                    * The max height of dropdown list.
                                                                                    */
  maxHeight: _propTypes.string,
  /**
                                 * Dropdown place holder, and the default value is 'Select one...'.
                                 */
  placeholder: _propTypes.string,
  /**
                                   * Filter place holder, and the default value is 'Filter...'.
                                   */
  filterPlaceholder: _propTypes.string,
  /**
                                         * Display which icon inside of dropdown.
                                         */
  preIcon: _propTypes.string,
  /**
                               * Dropdown size such as m, lg. And the default value is m.
                               */
  size: (0, _propTypes.oneOf)(['m', 'lg']),
  /**
                                             * Dropdown theme such as flat, gradient and borderless. And the default value is flat.
                                             */
  theme: (0, _propTypes.oneOf)(['flat', 'gradient', 'borderless']),
  /**
                                                                     * Whether or not to show more buttons.
                                                                     */
  isMoreButton: _propTypes.bool,
  /**
                                  * Whether or not to change dropdown.
                                  */
  disabled: _propTypes.bool,
  /**
                              * Whether or not to show filter.
                              */
  filter: _propTypes.bool,
  /**
                            * Whether or not to show highlight.
                            */
  highlight: _propTypes.bool,
  /**
                               * The data list of dropdown options.
                               */
  data: (0, _propTypes.arrayOf)((0, _propTypes.shape)({ text: _propTypes.string, value: (0, _propTypes.oneOfType)([_propTypes.string, _propTypes.number]) })),
  /**
                                                                                                                                                                * Custom style object.
                                                                                                                                                                */
  style: _propTypes.object, // eslint-disable-line
  /**
   * Fires when value change.
   */
  onChange: _propTypes.func,
  /**
                              * Render footer
                              */
  renderFooter: _propTypes.func };


/** Default Props for Dropdown */
var DropdownProps = {
  placeholder: 'Select one...',
  filterPlaceholder: 'Filter...',
  size: 'm',
  theme: 'flat',
  filter: false,
  highlight: false,
  data: [] };


/** UI component that displays Dropdown with variant settings.*/var
Dropdown = function (_PureComponent) {(0, _inherits3.default)(Dropdown, _PureComponent);




  function Dropdown(props) {(0, _classCallCheck3.default)(this, Dropdown);var _this = (0, _possibleConstructorReturn3.default)(this, (Dropdown.__proto__ || (0, _getPrototypeOf2.default)(Dropdown)).call(this,
    props));_initialiseProps.call(_this);var _this$props =

    _this.props,data = _this$props.data,value = _this$props.value,defaultValue = _this$props.defaultValue,highlight = _this$props.highlight;
    var val = value || defaultValue;
    var activeItemIndex = highlight ?
    _this.getActiveIndex(data, val) : -1;

    _this.uuid = (0, _v2.default)();
    _this.state = {
      isExpanded: false,
      value: val,
      dataView: data,
      activeItemIndex: activeItemIndex };return _this;

  }return Dropdown;}(_react.PureComponent);Dropdown.displayName = 'AAUIDropdown';Dropdown.defaultProps = DropdownProps;Dropdown.propTypes = DropdownPropTypes;var _initialiseProps = function _initialiseProps() {var _this2 = this;this.

  componentWillMount = function () {
    _this2.keyboardValue = '';
    _this2.clearKeyboardValue = (0, _debounce2.default)(function () {
      _this2.keyboardValue = '';
    }, 600);
  };this.

  componentDidMount = function () {
    (0, _defineProperties2.default)(_this2, {
      value: {
        get: function get() {
          return this.state.value;
        },
        set: function set(v) {
          if (this.props.value === undefined) {
            this.setState({ value: v });
          }
        } } });



    _this2.updateMaxHeight();
    _this2.updateFooterTop();
  };this.

  componentWillReceiveProps = function (nextProps) {
    var newState = {};
    if (nextProps.value !== _this2.props.value) {
      newState.value = nextProps.value;
    } else if (nextProps.defaultValue !== _this2.props.defaultValue) {
      newState.value = _this2.state.value === undefined ?
      nextProps.defaultValue :
      _this2.state.value;
    }
    if (nextProps.data !== _this2.props.data) {
      newState.dataView = nextProps.data;
    }
    if ((0, _keys2.default)(newState).length > 0) {
      var value = newState.value || nextProps.value || nextProps.defaultValue;
      newState.activeItemIndex = nextProps.highlight ?
      _this2.getActiveIndex(nextProps.data, value) : -1;
      _this2.setState(newState);
    }
  };this.

  componentDidUpdate = function () {
    if (_this2.state.isExpanded) {
      if (_this2.props.filter) {
        _this2.filterInput.focus();
      } else {
        _this2.itemMenu.focus();
      }

      var itemMenu = _this2.itemMenu;
      var activeItem = itemMenu.querySelector('.selected');
      if (activeItem) {
        var itemMenuHeight = itemMenu.offsetHeight;
        var itemMenuScrollTop = itemMenu.scrollTop;
        var activeItemTop = activeItem.offsetTop;
        var activeItemHeight = activeItem.offsetHeight;
        /* eslint no-mixed-operators: 0 */
        if (activeItemTop + activeItemHeight - itemMenuHeight - itemMenuScrollTop > 0) {
          itemMenu.scrollTop = activeItemTop + activeItemHeight - itemMenuHeight;
        } else if (activeItemTop < itemMenuScrollTop) {
          itemMenu.scrollTop = activeItemTop;
        }
      }

      _this2.updateMaxHeight();
      _this2.updateFooterTop();
    }
  };this.

  getActiveIndex = function (data, val) {return (0, _findIndex2.default)(data, function (item) {return item.value === val;});};this.

  getIndex = function (str) {
    var dataArray = _this2.props.data.toJS ? _this2.props.data.toJS() : _this2.props.data;
    var index = 0;
    var value = '';
    var length = _utils.DataAccess.count(dataArray);
    var isFound = false;
    var keyWords = '';
    var i = 0;
    if (_this2.state.keyWords && str.toUpperCase().indexOf(_this2.state.keyWords) === 0) {
      i = _this2.state.activeItemIndex + 1;
    }

    for (; i < length; i += 1) {
      value = _utils.DataAccess.get(dataArray[i], 'text');
      if (value.toUpperCase().indexOf(str) === 0) {
        index = i;
        isFound = true;
        keyWords = str;
        break;
      }
    }

    if (_this2.state.keyWords && str.toUpperCase().indexOf(_this2.state.keyWords) === 0) {
      if (!isFound) {
        for (i = 0; i < length; i += 1) {
          value = _utils.DataAccess.get(dataArray[i], 'text');
          if (value.toUpperCase().indexOf(str) === 0) {
            index = i;
            isFound = true;
            keyWords = str;
            break;
          }
        }
      }
    }

    return { index: index, isFound: isFound, keyWords: keyWords };
  };this.

  updateMaxHeight = function () {var _props =
    _this2.props,renderFooter = _props.renderFooter,maxHeight = _props.maxHeight;
    if (maxHeight && (0, _isFunction2.default)(renderFooter)) {
      _this2.listContainer.style.maxHeight = maxHeight - _this2.footer.offsetHeight + 'px';
    }
  };this.

  updateFooterTop = function () {var
    renderFooter = _this2.props.renderFooter;
    if ((0, _isFunction2.default)(renderFooter)) {
      _this2.footer.style.top = _this2.listContainer.offsetTop + _this2.listContainer.offsetHeight + 'px';
    }
  };this.

  tryCollapse = function () {
    if (_this2.state.isExpanded) {
      _this2._timer = setTimeout(function () {
        _this2.setState({
          isExpanded: false
          // activeItemIndex: -1
        });
      }, 100);
    }
  };this.

  cancelCollapseTimeout = function () {
    clearTimeout(_this2._timer);
  };this.

  giveFocus = function (e) {
    if (e.target === _this2.itemMenu) {
      _this2.itemMenu.focus();
    }
  };this.

  navigateByKeys = function (e) {
    if (e.keyCode === 9) {
      return;
    } //  focus next component if there are many input, dropdown
    // or others component on the screen when pressing tab.
    var isExpanded = false;
    e.preventDefault();
    /* eslint no-case-declarations: 0 */
    switch (e.keyCode) {
      case 38: // up (Previous item)
        var _state = _this2.state,prevIndex = _state.activeItemIndex,prevData = _state.dataView;
        _this2.state.isExpanded ? _this2.setState({
          activeItemIndex: _this2.getPrevActiveIndex(prevIndex - 1, prevData),
          isExpanded: true }) :
        _this2.setState({ isExpanded: true });
        break;
      case 40: // down (Next item)
        var _state2 = _this2.state,nextIndex = _state2.activeItemIndex,nextData = _state2.dataView;
        _this2.state.isExpanded ? _this2.setState({
          activeItemIndex: _this2.getNextActiveIndex(nextIndex + 1, nextData),
          isExpanded: true }) :
        _this2.setState({ isExpanded: true });
        break;
      case 13: // enter (Select the active item)
        isExpanded = _this2.state.isExpanded;
        if (isExpanded) {var _state3 =
          _this2.state,dataView = _state3.dataView,activeItemIndex = _state3.activeItemIndex;
          var value = _utils.DataAccess.get(dataView, activeItemIndex);
          var disabled = _utils.DataAccess.get(value, 'disabled');
          if (!disabled) {
            value = _utils.DataAccess.get(value, 'value');
            _this2.select(value, true);
            _this2.dropdownButton.focus();
          }
        } else {/* eslint no-else-return: 0 */
          _this2.setState({
            isExpanded: true,
            activeItemIndex: _this2.state.activeItemIndex });

        }
        break;
      case 27: // escape (Hide dropdown menu)
        _this2.setState({
          isExpanded: false,
          activeItemIndex: _this2.state.activeItemIndex });

        _this2.dropdownButton.focus();
        break;
      case 32: // blank (Show dropdown menu)
        isExpanded = _this2.state.isExpanded;
        if (isExpanded) {
          return; /* eslint no-useless-return: 0 */
        } else {/* eslint no-else-return: 0 */
          _this2.setState({
            isExpanded: true,
            activeItemIndex: _this2.state.activeItemIndex });

        }
        break;
      default: // Filter dropdown list by the key word
        if (!_this2.props.filter) {
          var charStr = String.fromCharCode(e.keyCode);
          _this2.keyboardValue = _this2.keyboardValue + charStr;
          _this2.filterFromKeyboard();
        }}

  };this.


  getNextActiveIndex = function (activeIndex, data) {
    var dataCount = _utils.DataAccess.count(data);
    return activeIndex < dataCount ? activeIndex : _this2.getNextActiveIndex(0, data);
  };this.

  getPrevActiveIndex = function (activeIndex, data) {
    var dataCount = _utils.DataAccess.count(data);
    return activeIndex >= 0 ? activeIndex : _this2.getPrevActiveIndex(dataCount - 1, data);
  };this.

  applyFilter = function (e) {
    _this2.setState({
      dataView: _this2.filterData(e.target.value, _this2.props.data) });

  };this.

  handleKeys = function (e) {
    // Delegate up, down, and escape to itemMenu.
    if ([38, 40, 27].indexOf(e.keyCode) > -1) return;
    // Delegate enter to itemMenu if up/down selections are already made.
    if (e.keyCode === 13 && _this2.state.activeItemIndex > -1) return;
    e.stopPropagation();
  };this.

  select = function (value) {
    var val = value;var
    highlight = _this2.props.highlight;
    var activeItemIndex = highlight ?
    _this2.getActiveIndex(_this2.state.dataView, val) : -1;

    _this2.setState({
      value: val,
      isExpanded: false,
      activeItemIndex: activeItemIndex },
    function () {
      if (_this2.props.onChange) _this2.props.onChange({ value: value });
    });
  };this.

  findItemByValue = function (value) {
    /* eslint no-restricted-syntax: 0 */var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {
      for (var _iterator = (0, _getIterator3.default)(_this2.props.data), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var item = _step.value;
        if (_utils.DataAccess.get(item, 'value') === value) {
          return item;
        }
      }} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}
    return undefined;
  };this.

  findTextByValue = function (value) {
    var item = _this2.findItemByValue(value);
    if (item) {
      return _utils.DataAccess.get(item, 'text');
    } else {
      return undefined;
    }
  };this.

  filterData = function (key, dataset) {
    var k = key.trim().toLowerCase();
    var klen = k.length;

    function matcher(item) {
      var t = _utils.DataAccess.get(item, 'text').trim().toLowerCase();
      var i = 0;
      var kc = k.charAt(i);var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {
        for (var _iterator2 = (0, _getIterator3.default)(t), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var tc = _step2.value;
          if (tc === kc) {
            i += 1;
            if (i >= klen) {
              return true;
            }
            kc = k.charAt(i);
          }
        }} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2.return) {_iterator2.return();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}
      return false;
    }

    return !k ? dataset : dataset.filter(matcher);
  };this.

  clearKeyboard = function (e) {
    e.persist();
    _this2.clearKeyboardValue(e);
  };this.

  filterFromKeyboard = function () {
    var result = _this2.getIndex(_this2.keyboardValue);
    if (result.isFound) {
      _this2.setState({
        activeItemIndex: result.index,
        keyWords: result.keyWords });

    }
  };this.

  toggleMenu = function () {
    clearTimeout(_this2._timer);

    _this2.setState({
      isExpanded: !_this2.state.isExpanded });

  };this.

  handleInputOnclick = function (value) {return function () {
      _this2.select(value);
    };};this.

  render = function () {var _classNames;var _props2 =





    _this2.props,className = _props2.className,maxHeight = _props2.maxHeight,placeholder = _props2.placeholder,filterPlaceholder = _props2.filterPlaceholder,size = _props2.size,theme = _props2.theme,preIcon = _props2.preIcon,disabled = _props2.disabled,filter = _props2.filter,isMoreButton = _props2.isMoreButton,renderFooter = _props2.renderFooter,renderItem = _props2.renderItem,style = _props2.style,rest = (0, _objectWithoutProperties3.default)(_props2, ['className', 'maxHeight', 'placeholder', 'filterPlaceholder', 'size', 'theme', 'preIcon', 'disabled', 'filter', 'isMoreButton', 'renderFooter', 'renderItem', 'style']);var _state4 =
    _this2.state,isExpanded = _state4.isExpanded,value = _state4.value,dataView = _state4.dataView,activeItemIndex = _state4.activeItemIndex;
    var hasFooter = (0, _isFunction2.default)(renderFooter);
    var validProps = (0, _utils.filterValidCustomProps)(rest);
    var classes = (0, _classnames2.default)((_classNames = {
      dropdown: true,
      'dropdown--with-footer': hasFooter,
      'dropdown--with-search': filter }, (0, _defineProperty3.default)(_classNames, 'dropdown--' +
    theme, theme), (0, _defineProperty3.default)(_classNames, 'dropdown--' +
    size, size), _classNames),
    className);
    var buttonClasses = (0, _classnames2.default)({
      dropdown__button: true,
      show: isMoreButton && isExpanded,
      expand: !isMoreButton && isExpanded,
      collapse: !isMoreButton && !isExpanded,
      input__field: true,
      disabled: disabled });

    var listClasses = (0, _classnames2.default)({
      dropdown__menu: true,
      show: isExpanded && !disabled,
      'has-footer': hasFooter });

    var itemMenuStyle = hasFooter ? undefined : { maxHeight: maxHeight };

    return (
      _react2.default.createElement('div', {
          className: classes,
          style: style,
          ref: function ref(_ref5) {_this2.itemMenu = _ref5;},
          tabIndex: 0,
          role: 'listbox',
          'aria-activedescendant': _this2.uuid + '_' + activeItemIndex,
          onBlur: _this2.tryCollapse,
          onKeyUp: disabled ? undefined : _this2.clearKeyboard,
          onKeyDown: disabled ? undefined : _this2.navigateByKeys,
          onMouseDown: _this2.giveFocus,
          onFocus: _this2.cancelCollapseTimeout },

        _react2.default.createElement('button', (0, _extends3.default)({
            type: 'button',
            ref: function ref(_ref) {_this2.dropdownButton = _ref;},
            role: 'combobox' },
          validProps, {
            'aria-expanded': isExpanded && !disabled,
            'aria-haspopup': 'listbox' // eslint-disable-line
            , 'aria-label': _this2.findTextByValue(value) || placeholder,
            className: buttonClasses,
            onMouseDown: function onMouseDown(e) {return e.preventDefault();},
            onClick: disabled ? undefined : _this2.toggleMenu }),

          preIcon && _react2.default.createElement('i', { className: 'dropdown__prefix-icon ' + preIcon }),
          _react2.default.createElement('span', {
              className: 'dropdown__button-text',
              role: 'textbox' },

            _this2.findTextByValue(value) || placeholder),

          isMoreButton ?
          _react2.default.createElement('span', { className: 'icon icon-caret-down' }) :
          _react2.default.createElement('span', { className: '' + (isExpanded ? 'icon icon-chevron-up' : 'icon icon-chevron-down') })),


        _react2.default.createElement('div', null,
          _react2.default.createElement('ul', {
              className: listClasses,
              ref: function ref(_ref3) {_this2.listContainer = _ref3;},
              style: itemMenuStyle },

            filter ?

            _react2.default.createElement('li', null,
              _react2.default.createElement('div', { className: 'dropdown__menu__search-box' },
                _react2.default.createElement('i', { className: 'icon icon-search' }),
                _react2.default.createElement('input', {
                  type: 'text',
                  className: 'input',
                  ref: function ref(_ref2) {_this2.filterInput = _ref2;},
                  role: 'textbox',
                  'aria-label': 'Search',
                  autoComplete: 'off',
                  placeholder: filterPlaceholder,
                  onKeyDown: _this2.handleKeys,
                  onChange: _this2.applyFilter }))) :




            undefined,
            filter ?

            _react2.default.createElement('li', { className: 'dropdown__menu-divider', role: 'separator' }) :

            undefined,
            dataView.map(function (item, i) {
              var content = !(0, _isFunction2.default)(renderItem) ?
              _react2.default.createElement('a', null, _utils.DataAccess.get(item, 'text')) :
              renderItem(item, {
                selected: i === activeItemIndex,
                disabled: _utils.DataAccess.get(item, 'disabled') });


              return (
                _react2.default.createElement('li', {
                    id: _this2.uuid + '_' + i,
                    key: _utils.DataAccess.get(item, 'value'),
                    role: 'option',
                    'aria-selected': i === activeItemIndex ? true : undefined,
                    onClick: !_utils.DataAccess.get(item, 'disabled') && _this2.handleInputOnclick(_utils.DataAccess.get(item, 'value')),
                    className: (0, _classnames2.default)({
                      selected: i === activeItemIndex,
                      disabled: _utils.DataAccess.get(item, 'disabled') }),

                    'aria-disabled': _utils.DataAccess.get(item, 'disabled') },

                  content));


            })),



          hasFooter &&
          _react2.default.createElement('div', {
              className: (0, _classnames2.default)('dropdown__footer', { show: isExpanded && !disabled }),
              ref: function ref(_ref4) {_this2.footer = _ref4;} },

            renderFooter({ toggleMenu: _this2.toggleMenu })))));





  };};exports.default =



Dropdown;module.exports = exports['default'];