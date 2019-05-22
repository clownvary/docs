'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _findIndex = require('babel-runtime/core-js/array/find-index');

var _findIndex2 = _interopRequireDefault(_findIndex);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _defineProperties = require('babel-runtime/core-js/object/define-properties');

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('../shared/utils');

var _keyCodes = require('../shared/keyCodes');

var _keyCodes2 = _interopRequireDefault(_keyCodes);

var _dataAccess = require('../shared/data-access');

var da = _interopRequireWildcard(_dataAccess);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dropdown = function (_PureComponent) {
  (0, _inherits3.default)(Dropdown, _PureComponent);

  function Dropdown(props) {
    (0, _classCallCheck3.default)(this, Dropdown);

    var _this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call(this, props));

    _initialiseProps.call(_this);

    var _this$props = _this.props,
        data = _this$props.data,
        value = _this$props.value,
        defaultValue = _this$props.defaultValue,
        highlight = _this$props.highlight;

    var val = value || defaultValue;
    var activeItemIndex = highlight ? _this.getActiveIndex(data, val) : -1;

    _this.state = {
      isExpanded: false,
      value: val,
      dataView: data,
      activeItemIndex: activeItemIndex
    };
    return _this;
  }

  return Dropdown;
}(_react.PureComponent);

Dropdown.displayName = 'AAUIDropdown';
Dropdown.propTypes = {
  className: _propTypes.string,
  value: _propTypes.string,
  defaultValue: _propTypes.string,
  maxHeight: _propTypes.string,
  placeholder: _propTypes.string,
  filterPlaceholder: _propTypes.string,
  preIcon: _propTypes.string,
  size: (0, _propTypes.oneOf)(['m', 'lg']),
  theme: (0, _propTypes.oneOf)(['flat', 'gradient', 'borderless']),
  isMoreButton: _propTypes.bool,
  disabled: _propTypes.bool,
  filter: _propTypes.bool,
  highlight: _propTypes.bool,
  uncontrolled: _propTypes.bool,
  data: _propTypes.any, // eslint-disable-line
  style: _propTypes.object, // eslint-disable-line
  onChange: _propTypes.func,
  onExpand: _propTypes.func,
  onCollapse: _propTypes.func
};
Dropdown.defaultProps = {
  placeholder: 'Select one...',
  filterPlaceholder: 'Filter...',
  size: 'm',
  theme: 'flat',
  filter: false,
  highlight: false,
  uncontrolled: true, // keep it compatiable with existing implementation
  onChange: _utils.noop,
  onExpand: _utils.noop,
  onCollapse: _utils.noop
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.componentWillMount = function () {
    _this2.keyboardValue = '';
    _this2.clearKeyboardValue = (0, _utils.debounce)(function () {
      _this2.keyboardValue = '';
    }, 600);
  };

  this.componentDidMount = function () {
    (0, _defineProperties2.default)(_this2, {
      value: {
        get: function get() {
          return this.state.value;
        },
        set: function set(v) {
          if (this.props.value === undefined) {
            this.setState({ value: v });
          }
        }
      }
    });
  };

  this.componentWillReceiveProps = function (nextProps) {
    var newState = {};
    if (nextProps.value !== _this2.props.value) {
      newState.value = nextProps.value;
    } else if (nextProps.defaultValue !== _this2.props.defaultValue) {
      newState.value = _this2.state.value === undefined ? nextProps.defaultValue : _this2.state.value;
    }
    if (nextProps.data !== _this2.props.data) {
      newState.dataView = nextProps.data;
    }
    if ((0, _keys2.default)(newState).length > 0) {
      var value = newState.value || nextProps.value || nextProps.defaultValue;
      newState.activeItemIndex = nextProps.highlight ? _this2.getActiveIndex(nextProps.data, value) : -1;
      _this2.setState(newState);
    }
  };

  this.componentDidUpdate = function (prevProps, prevState) {
    if (_this2.state.isExpanded && !prevState.isExpanded) {
      _this2.props.onExpand();
    }

    if (prevState.isExpanded && !_this2.state.isExpanded) {
      _this2.props.onCollapse();
    }

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
        activeItem.focus();
      }
    }
  };

  this.getActiveIndex = function (data, val) {
    return (0, _findIndex2.default)(data, function (item) {
      return item.value === val;
    });
  };

  this.getIndex = function (str) {
    var dataArray = _this2.props.data.toJS ? _this2.props.data.toJS() : _this2.props.data;
    var index = 0;
    var value = '';
    var length = da.count(dataArray);
    var isFound = false;
    var keyWords = '';
    var i = 0;
    if (_this2.state.keyWords && str.toUpperCase().indexOf(_this2.state.keyWords) === 0) {
      i = _this2.state.activeItemIndex + 1;
    }

    for (; i < length; i += 1) {
      value = da.get(dataArray[i], 'text');
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
          value = da.get(dataArray[i], 'text');
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
  };

  this.tryCollapse = function () {
    if (_this2.state.isExpanded) {
      _this2._timer = setTimeout(function () {
        _this2.setState({
          isExpanded: false
          // activeItemIndex: -1
        });
      }, 100);
    }
  };

  this.cancelCollapseTimeout = function () {
    clearTimeout(_this2._timer);
  };

  this.giveFocus = function (e) {
    if (e.target === _this2.itemMenu) {
      _this2.itemMenu.focus();
    }
  };

  this.navigateByKeys = function (e) {
    if (e.keyCode === 9) {
      return;
    }
    // focus next component if there are many input, dropdown
    // or others component on the screen when pressing tab.
    var isExpanded = false;
    e.preventDefault();
    switch (e.keyCode) {
      case _keyCodes2.default.UPARROW:
        // up (Previous item)
        _this2.setState({
          activeItemIndex: _this2.state.activeItemIndex - 1 >= 0 ? _this2.state.activeItemIndex - 1 : da.count(_this2.state.dataView) - 1,
          isExpanded: true
        });
        break;
      case _keyCodes2.default.DOWNARROW:
        // down (Next item)
        _this2.setState({
          activeItemIndex: _this2.state.activeItemIndex + 1 < da.count(_this2.state.dataView) ? _this2.state.activeItemIndex + 1 : 0,
          isExpanded: true
        });
        break;
      case _keyCodes2.default.ENTER:
        // enter (Select the active item)
        {
          var _state = _this2.state,
              dataView = _state.dataView,
              activeItemIndex = _state.activeItemIndex;


          if (activeItemIndex !== -1) {
            var value = da.get(dataView, activeItemIndex);
            value = da.get(value, 'value');
            _this2.select(value);
            _this2.dropdownButton.focus();
          }
        }
        break;
      case _keyCodes2.default.ESCAPE:
        // escape (Hide dropdown menu)
        _this2.setState({
          isExpanded: false,
          activeItemIndex: _this2.state.activeItemIndex
        });
        _this2.dropdownButton.focus();
        break;
      case _keyCodes2.default.SPACE:
        // blank (Show dropdown menu)
        isExpanded = _this2.state.isExpanded;
        if (!isExpanded) {
          _this2.setState({
            isExpanded: true,
            activeItemIndex: _this2.state.activeItemIndex
          });
        }
        break;
      default:
        // Filter dropdown list by the key word
        if (!_this2.props.filter) {
          var charStr = String.fromCharCode(e.keyCode);
          _this2.keyboardValue = _this2.keyboardValue + charStr;
          _this2.filterFromKeyboard();
        }
    }
  };

  this.applyFilter = function (e) {
    _this2.setState({
      dataView: _this2.filterData(e.target.value, _this2.props.data)
    });
  };

  this.handleKeys = function (e) {
    // Delegate up, down, and escape to itemMenu.
    if ([38, 40, 27].indexOf(e.keyCode) > -1) return;
    // Delegate enter to itemMenu if up/down selections are already made.
    if (e.keyCode === 13 && _this2.state.activeItemIndex > -1) return;
    e.stopPropagation();
  };

  this.select = function (value) {
    var _props = _this2.props,
        highlight = _props.highlight,
        uncontrolled = _props.uncontrolled,
        onChange = _props.onChange;

    var activeItemIndex = highlight ? _this2.getActiveIndex(_this2.state.dataView, value) : -1;

    _this2.setState({
      isExpanded: false,
      activeItemIndex: activeItemIndex
    });

    if (!('value' in _this2.props) || uncontrolled) {
      _this2.setState({
        value: value
      });
    }

    onChange({ value: value });
  };

  this.findItemByValue = function (value) {
    /* eslint no-restricted-syntax: 0 */
    for (var _iterator = _this2.props.data, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var item = _ref;

      if (da.get(item, 'value') === value) {
        return item;
      }
    }
    return undefined;
  };

  this.findTextByValue = function (value) {
    var item = _this2.findItemByValue(value);

    if (item) {
      return da.get(item, 'text');
    }

    return undefined;
  };

  this.filterData = function (key, dataset) {
    var k = key.trim().toLowerCase();
    var klen = k.length;

    function matcher(item) {
      var t = da.get(item, 'text').trim().toLowerCase();
      var i = 0;
      var kc = k.charAt(i);
      for (var _iterator2 = t, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var tc = _ref2;

        if (tc === kc) {
          i += 1;
          if (i >= klen) {
            return true;
          }
          kc = k.charAt(i);
        }
      }
      return false;
    }

    return !k ? dataset : dataset.filter(matcher);
  };

  this.clearKeyboard = function (e) {
    e.persist();
    _this2.clearKeyboardValue(e);
  };

  this.filterFromKeyboard = function () {
    var result = _this2.getIndex(_this2.keyboardValue);
    if (result.isFound) {
      _this2.setState({
        activeItemIndex: result.index,
        keyWords: result.keyWords
      });
    }
  };

  this.toggleMenu = function () {
    clearTimeout(_this2._timer);

    _this2.setState({
      isExpanded: !_this2.state.isExpanded
    });
  };

  this.handleInputOnclick = function (value) {
    return function () {
      _this2.select(value);
    };
  };

  this.render = function () {
    var _classNames;

    var _props2 = _this2.props,
        className = _props2.className,
        maxHeight = _props2.maxHeight,
        placeholder = _props2.placeholder,
        filterPlaceholder = _props2.filterPlaceholder,
        size = _props2.size,
        theme = _props2.theme,
        preIcon = _props2.preIcon,
        disabled = _props2.disabled,
        filter = _props2.filter,
        isMoreButton = _props2.isMoreButton,
        style = _props2.style,
        rest = (0, _objectWithoutProperties3.default)(_props2, ['className', 'maxHeight', 'placeholder', 'filterPlaceholder', 'size', 'theme', 'preIcon', 'disabled', 'filter', 'isMoreButton', 'style']);
    var _state2 = _this2.state,
        isExpanded = _state2.isExpanded,
        value = _state2.value,
        dataView = _state2.dataView,
        activeItemIndex = _state2.activeItemIndex;

    var validProps = (0, _utils.filterValidProps)(rest);
    var classes = (0, _classnames2.default)((_classNames = {
      dropdown: true,
      'dropdown--with-search': filter
    }, _classNames['dropdown--' + theme] = theme, _classNames['dropdown--' + size] = size, _classNames), className);
    var buttonClasses = (0, _classnames2.default)({
      dropdown__button: true,
      show: isMoreButton && isExpanded,
      expand: !isMoreButton && isExpanded,
      collapse: !isMoreButton && !isExpanded,
      disabled: disabled
    });
    var listClasses = (0, _classnames2.default)({
      dropdown__menu: true,
      show: isExpanded && !disabled
    });

    return _react2.default.createElement(
      'div',
      (0, _extends3.default)({
        className: classes,
        style: style
      }, validProps, {
        onKeyUp: disabled ? undefined : _this2.clearKeyboard,
        onKeyDown: disabled ? undefined : _this2.navigateByKeys,
        role: 'combobox',
        'aria-expanded': isExpanded && !disabled
      }),
      _react2.default.createElement(
        'button',
        {
          type: 'button',
          ref: function ref(_ref3) {
            _this2.dropdownButton = _ref3;
          },
          'aria-label': _this2.findTextByValue(value) || placeholder,
          className: buttonClasses,
          onMouseDown: function onMouseDown(e) {
            return e.preventDefault();
          },
          onClick: disabled ? undefined : _this2.toggleMenu
        },
        preIcon && _react2.default.createElement('i', { className: 'dropdown__prefix-icon ' + preIcon }),
        _react2.default.createElement(
          'span',
          { className: 'dropdown__button-text', role: 'textbox' },
          _this2.findTextByValue(value) || placeholder
        ),
        isMoreButton ? _react2.default.createElement('span', { className: 'icon-caret-down' }) : _react2.default.createElement('span', {
          className: '' + (isExpanded ? 'icon-chevron-up' : 'icon-chevron-down')
        })
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'ul',
          {
            className: listClasses,
            ref: function ref(_ref5) {
              _this2.itemMenu = _ref5;
            },
            role: 'listbox',
            tabIndex: 0,
            style: { maxHeight: maxHeight },
            onMouseDown: _this2.giveFocus,
            onFocus: _this2.cancelCollapseTimeout,
            onBlur: _this2.tryCollapse
          },
          filter ? _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              'div',
              { className: 'dropdown__menu__search-box' },
              _react2.default.createElement('i', { className: 'icon-search' }),
              _react2.default.createElement('input', {
                type: 'text',
                className: 'input',
                ref: function ref(_ref4) {
                  _this2.filterInput = _ref4;
                },
                role: 'textbox',
                'aria-label': 'Search',
                autoComplete: 'off',
                placeholder: filterPlaceholder,
                onKeyDown: _this2.handleKeys,
                onChange: _this2.applyFilter
              })
            )
          ) : undefined,
          filter ? _react2.default.createElement('li', { className: 'dropdown__menu-divider', role: 'separator' }) : undefined,
          dataView.map(function (item, i) {
            return _react2.default.createElement(
              'li',
              {
                key: da.get(item, 'value'),
                tabIndex: 0,
                role: 'option',
                className: i === activeItemIndex ? 'selected' : undefined,
                'aria-selected': i === activeItemIndex ? true : undefined,
                onClick: _this2.handleInputOnclick(da.get(item, 'value'))
              },
              _react2.default.createElement(
                'a',
                null,
                da.get(item, 'text')
              )
            );
          })
        )
      )
    );
  };
};

exports.default = Dropdown;
module.exports = exports['default'];