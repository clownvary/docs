'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _keys = require('babel-runtime/core-js/object/keys');var _keys2 = _interopRequireDefault(_keys);var _defineProperties = require('babel-runtime/core-js/object/define-properties');var _defineProperties2 = _interopRequireDefault(_defineProperties);var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _templateObject = (0, _taggedTemplateLiteral3.default)(['aaui-dropdown ', ''], ['aaui-dropdown ', '']),_templateObject2 = (0, _taggedTemplateLiteral3.default)(['aaui-dropdown__button ', '\n                            ', '\n                            ', '\n                            ', ''], ['aaui-dropdown__button ', '\n                            ', '\n                            ', '\n                            ', '']),_templateObject3 = (0, _taggedTemplateLiteral3.default)(['icon aaui-dropdown__button-icon\n                         ', ''], ['icon aaui-dropdown__button-icon\n                         ', '']);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _immutable = require('immutable');
var _propTypes = require('prop-types');
var _find = require('lodash/find');var _find2 = _interopRequireDefault(_find);
var _debounce = require('lodash/debounce');var _debounce2 = _interopRequireDefault(_debounce);
var _throttle = require('lodash/throttle');var _throttle2 = _interopRequireDefault(_throttle);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _difference = require('lodash/difference');var _difference2 = _interopRequireDefault(_difference);
var _Checkbox = require('../Checkbox');var _Checkbox2 = _interopRequireDefault(_Checkbox);
var _LoadingBar = require('../LoadingBar');var _LoadingBar2 = _interopRequireDefault(_LoadingBar);
var _consts = require('../../consts');
var _utils = require('../../utils');


var _Item = require('./Item');var _Item2 = _interopRequireDefault(_Item);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                        * Default PropTypes of Dropdown.
                                                                                                                                                                        */
var DropdownPropTypes = {
  /**
                           * Custom class name.
                           */
  className: _propTypes.string,
  /**
                                 * Custom style object.
                                 */
  style: _propTypes.object, // eslint-disable-line
  /**
   * Whether or not to change dropdown.
   */
  disabled: _propTypes.bool,
  /**
                              * Dropdown place holder, and the default value is 'Select one...'.
                              */
  placeholder: _propTypes.string,
  /**
                                   * The max height of dropdown list.
                                   */
  maxHeight: (0, _propTypes.shape)({ maxHeight: _propTypes.string }),
  /**
                                                                       * Whether or not to show filter.
                                                                       */
  filter: _propTypes.bool,
  /**
                            * Filter place holder, and the default value is 'Filter...'.
                            */
  filterPlaceholder: _propTypes.string,
  /**
                                         * Whether or not to show filter.
                                         */
  serverFilter: _propTypes.bool,
  /**
                                  * Whether or not to show data list when init.
                                  */
  autoOpen: _propTypes.bool,
  /**
                              * Dropdown theme such as flat, gradient and borderless. And the default value is flat.
                              */
  theme: (0, _propTypes.oneOf)(['flat', 'gradient', 'borderless']),
  /**
                                                                     * Whether or not to show error style.
                                                                     */
  errored: _propTypes.bool,
  /**
                             * Whether or not to display checkbox of each option.
                             */
  showCheckbox: _propTypes.bool,
  /**
                                  * Whether or not to dispaly check all option.
                                  */
  showAllCheckbox: _propTypes.bool,
  /**
                                     * Whether or not to show text tip when hovering the option.
                                     */
  showTextTip: _propTypes.bool,
  /**
                                 * Whether or not to show spiner when loading data.
                                 */
  showSpiner: _propTypes.bool,
  /**
                                * Error message.
                                */
  errorInfo: _propTypes.string,
  /**
                                 * Whether or not to show the count of data list.
                                 */
  showResults: _propTypes.bool,
  /**
                                 * Customize how to render Count of data list.
                                 */
  results: _propTypes.func,
  /**
                             * Whether or not to show error message.
                             */
  showError: _propTypes.bool,
  /**
                               * Error infomation template.
                               */
  errorInfoTemplate: _propTypes.string,
  /**
                                         * Whether or not to onlyt show text as default place holder.
                                         */
  onlyDefaultPlaceholder: _propTypes.bool,
  /**
                                            * The prefix of text.
                                            */
  prefix: _propTypes.string,
  /**
                              * Dropdown value.
                              */
  value: (0, _propTypes.oneOfType)([_propTypes.string, _propTypes.number, _propTypes.object, _propTypes.array]),
  /**
                                                                                                                  * Dropdown default value.
                                                                                                                  */
  defaultValue: (0, _propTypes.oneOfType)([_propTypes.string, _propTypes.number, _propTypes.object]),
  /**
                                                                                                       * Display which icon inside of dropdown.
                                                                                                       */
  data: (0, _propTypes.arrayOf)((0, _propTypes.shape)({ text: _propTypes.string, value: (0, _propTypes.oneOfType)([_propTypes.string, _propTypes.number, _propTypes.object]) })),
  /**
                                                                                                                                                                                   * Fires when value change.
                                                                                                                                                                                   */
  onChange: _propTypes.func,
  /**
                              * Whether or not to get data with fuzzy query.
                              */
  fuzzyQuery: _propTypes.bool,
  /**
                                * Whether or not to show checked items text just checked one item.
                                */
  showTxtOnlyCheckedOneItem: _propTypes.bool,
  /**
                                               * Whether or not to show the menu list of Dropdown.
                                               */
  visible: _propTypes.bool,
  /**
                             * Whether or not to show the icon of deselectting all items .
                             */
  showDeselectall: _propTypes.bool,
  /**
                                     * The suffix text of button.
                                     */
  txtSuffix: _propTypes.string,
  /**
                                 * The text when length of data list is 0.
                                 */
  noResult: _propTypes.string };


/** Default Props for Dropdown */
var DropdownProps = {
  placeholder: 'Select one...',
  txtSuffix: 'selected',
  filterPlaceholder: 'Filter...',
  showDeselectall: false,
  showAll: true,
  noResult: 'No results found.',
  fuzzyQuery: false,
  autoOpen: false,
  showTxtOnlyCheckedOneItem: true,
  visible: true,
  theme: 'flat',
  data: [] };



/** UI component that displays Dropdown with variant settings.*/var
Dropdown = function (_React$PureComponent) {(0, _inherits3.default)(Dropdown, _React$PureComponent);




  function Dropdown(props) {(0, _classCallCheck3.default)(this, Dropdown);var _this = (0, _possibleConstructorReturn3.default)(this, (Dropdown.__proto__ || (0, _getPrototypeOf2.default)(Dropdown)).call(this,
    props));_initialiseProps.call(_this);

    var rowState = {};
    if (_this.props.showCheckbox) {
      _this.checkboxArray = (0, _immutable.OrderedMap)({});

      _this.state = {
        isExpanded: false,
        value: _this.props.value || _this.props.defaultValue || [],
        initValue: _this.props.value || _this.props.defaultValue || [],
        dataView: _this.props.data,
        activeItemIndex: -1,
        rowState: rowState,
        showSpiner: _this.props.showSpiner || false,
        errorInfo: _this.props.errorInfo,
        checkAll: false,
        showClearFilterIcon: false,
        keyWords: '',
        serverFilterLoading: false };

    } else {
      _this.state = {
        isExpanded: false,
        value: _this.props.value || _this.props.defaultValue,
        dataView: _this.props.data,
        activeItemIndex: -1,
        showClearFilterIcon: false,
        keyWords: '',
        serverFilterLoading: false };

    }

    _this.select = _this.select.bind(_this);
    _this.serverFilterKeyword = '';

    _this._refs = {};return _this;
  }(0, _createClass3.default)(Dropdown, [{ key: 'render', value: function render()

    {var _this2 = this;var _props =










      this.props,className = _props.className,style = _props.style,disabled = _props.disabled,placeholder = _props.placeholder,maxHeight = _props.maxHeight,name = _props.name,flexibleMenu = _props.flexibleMenu,filter = _props.filter,filterPlaceholder = _props.filterPlaceholder,serverFilter = _props.serverFilter,autoOpen = _props.autoOpen,theme = _props.theme,errored = _props.errored,showCheckbox = _props.showCheckbox,showAllCheckbox = _props.showAllCheckbox,showTextTip = _props.showTextTip,showSpiner = _props.showSpiner,errorInfo = _props.errorInfo,showResults = _props.showResults,results = _props.results,showError = _props.showError,errorInfoTemplate = _props.errorInfoTemplate,showDeselectall = _props.showDeselectall,onlyDefaultPlaceholder = _props.onlyDefaultPlaceholder,prefix = _props.prefix,visible = _props.visible,rest = (0, _objectWithoutProperties3.default)(_props, ['className', 'style', 'disabled', 'placeholder', 'maxHeight', 'name', 'flexibleMenu', 'filter', 'filterPlaceholder', 'serverFilter', 'autoOpen', 'theme', 'errored', 'showCheckbox', 'showAllCheckbox', 'showTextTip', 'showSpiner', 'errorInfo', 'showResults', 'results', 'showError', 'errorInfoTemplate', 'showDeselectall', 'onlyDefaultPlaceholder', 'prefix', 'visible']);var _state =
      this.state,value = _state.value,dataView = _state.dataView,activeItemIndex = _state.activeItemIndex,serverFilterLoading = _state.serverFilterLoading;
      var isExpanded = this.state.isExpanded && !disabled;
      var dataProps = (0, _utils.filterBy)(rest, 'data-');

      var dropdownBtnTitle = '';
      var dropdownBtnInnerHTML = void 0;
      if (showCheckbox) {
        if (onlyDefaultPlaceholder) {
          dropdownBtnTitle = placeholder;
          dropdownBtnInnerHTML = placeholder;
        } else {
          dropdownBtnTitle += showTextTip ? (0, _utils.decodeHtmlStr)('' + (this.findMutiTextByValue() || placeholder)) : '';
          dropdownBtnInnerHTML = this.findMutiTextByValue() || placeholder;
        }
      } else {
        var prefixText = prefix || '';
        var text = prefixText + ' ' + (this.findTextByValue(value) || placeholder);
        dropdownBtnTitle += showTextTip ? (0, _utils.decodeHtmlStr)(text) : '';
        dropdownBtnInnerHTML = text;
      }
      var menuStyle = (0, _extends3.default)({}, maxHeight);
      if (flexibleMenu && this._refs.node) {
        menuStyle.width = this._refs.node.offsetWidth;
      }

      return (
        _react2.default.createElement('div', (0, _extends3.default)({
            className: (0, _utils.cls)(_templateObject, className || ''),
            ref: function ref(c) {_this2._refs.node = c;},
            style: style }, dataProps, {
            onKeyUp: disabled ? undefined : this.clearKeyboard,
            onKeyDown: disabled ? undefined : this.navigateByKeys,
            onKeyPress: disabled ? undefined : this.applyActive }),

          _react2.default.createElement('button', {
              type: 'button',
              ref: function ref(_ref) {_this2.dropdownButton = _ref;},
              role: 'button',
              'aria-label': this.findTextByValue(value),
              className: (0, _utils.cls)(_templateObject2, theme ? 'aaui-dropdown-btn-' + theme : '',
              isExpanded ? 'is-expanded' : '',
              disabled ? 'is-disabled' : '',
              errored ? 'is-error' : ''),
              onFocus: function onFocus() {
                if (!autoOpen) {
                  return;
                }
                if (_this2.ignoreFocus) {
                  _this2.ignoreFocus = false;
                  return;
                }

                !disabled && !isExpanded && _this2.toggleMenu();
              },
              onClick: function onClick() {
                if (autoOpen) {
                  return;
                }

                !disabled && _this2.toggleMenu();
              },
              onMouseDown: function onMouseDown(e) {
                e.preventDefault();
                if (!autoOpen) {
                  return;
                }
                _this2.ignoreFocus = true;
              },
              onMouseUp: function onMouseUp(e) {
                if (!autoOpen) {
                  return;
                }

                e.button === 0 && !disabled && _this2.toggleMenu();
                _this2.ignoreFocus = false;
              } },


            _react2.default.createElement('div', {
                className: 'aaui-dropdown__button-text',
                title: dropdownBtnTitle },

              (0, _utils.decodeHtmlStr)(dropdownBtnInnerHTML)),


            _react2.default.createElement('i', {
              className: (0, _utils.cls)(_templateObject3,
              isExpanded ? 'icon-chevron-up' : 'icon-chevron-down') })),



          (visible || this.menuWrapper) &&
          _react2.default.createElement('div', {
              className: 'aaui-dropdown__menu-wrapper ' + (this.props.menuLocateRight ? 'is-right-align' : '') + ' ' + (isExpanded ? '' : 'u-hidden'),
              ref: function ref(c) {_this2.menuWrapper = c;},
              role: 'combobox',
              tabIndex: 0,
              'aria-expanded': isExpanded && !disabled,
              onMouseDown: this.giveFocus,
              onFocus: this.cancelCollapseTimeout,
              onBlur: this.tryCollapse },

            filter && (_utils.DataAccess.count(dataView) > 0 || this.isFilterInputKeydown || serverFilter) ?

            _react2.default.createElement('div', {
                className: 'aaui-dropdown__filter ' + (this.state.showClearFilterIcon ? 'is-remove' : '') },

              _react2.default.createElement('i', { className: 'icon icon-search' }),
              _react2.default.createElement('input', {
                type: 'text',
                ref: function ref(c) {_this2.filterInput = c;},
                role: 'textbox',
                'aria-label': 'Search',
                className: 'aaui-dropdown__filter-input',
                autoComplete: 'off',
                placeholder: filterPlaceholder,
                onFocus: this.cleanActivedItem,
                onKeyDown: this.handleKeys,
                onInput: this.applyFilter }),

              _react2.default.createElement('i', {
                className: 'icon icon-close ' + (this.state.showClearFilterIcon ? '' : 'u-hidden'),
                onClick: this.clearFilter })) :



            undefined,
            _react2.default.createElement('div', { className: 'aaui-dropdown__menu' },
              _react2.default.createElement('ul', {
                  ref: function ref(c) {_this2.dropdownMenu = c;},
                  role: 'listbox',
                  'aria-expanded': isExpanded && !disabled,
                  style: menuStyle,
                  className: '' + (_utils.DataAccess.count(dataView) > 0 ? '' : 'u-hidden') },


                showCheckbox && showAllCheckbox && _utils.DataAccess.count(this.state.dataView) > 0 &&

                _react2.default.createElement('li', { className: this.state.checkAll ? 'is-selected' : '' },
                  _react2.default.createElement(_Checkbox2.default, {
                      checked: this.state.checkAll,
                      onChange: this.checkAll }, ' ',
                    this.props.allTxt || 'All', ' ')),



                dataView.map(function (item, i) {
                  var key = _utils.DataAccess.get(item, 'value');
                  var text = (0, _utils.decodeHtmlStr)(_utils.DataAccess.get(item, 'text'));
                  var active = i === activeItemIndex;
                  var selected = showCheckbox ?
                  _this2.state.rowState[key] : key === _this2.state.value;
                  var css = active ? 'is-active' : '';
                  css += selected ? ' is-selected' : '';

                  if (showCheckbox) {
                    return (
                      _this2.props.itemTemplate ? _this2.decorate(item, i) :
                      _react2.default.createElement(_Item2.default, {
                        key: key,
                        role: 'option',
                        showTextTip: showTextTip,
                        data: item,
                        isCheck: selected,
                        click: _this2.check,
                        index: i,
                        errorInfo: errorInfo || '',
                        ccs: css }));


                  } else if (showTextTip) {
                    return (
                      _this2.props.deleteitemTemplate ? _this2.decorateDeleleTmplate(item, i) :
                      _react2.default.createElement('li', {
                          key: key,
                          title: text,
                          role: 'option',
                          className: css,
                          'aria-selected': active ? true : undefined,
                          'aria-label': _utils.DataAccess.get(item, 'text'),
                          onClick: function onClick() {_this2.select(key);} },

                        _react2.default.createElement('span', null, text)));


                  }
                  return (
                    _react2.default.createElement('li', {
                        key: key,
                        role: 'option',
                        className: css,
                        'aria-selected': active ? true : undefined,
                        'aria-label': _utils.DataAccess.get(item, 'text'),
                        onClick: function onClick() {_this2.select(key);} },

                      _react2.default.createElement('span', null, text)));


                })),

              _react2.default.createElement('div', null,
                _react2.default.createElement('div', { className: 'aaui-dropdown__menu-footer' + (showDeselectall || !this.props.showAll ? ' dropdown-status' : '') },
                  _react2.default.createElement('div', { className: showSpiner ? 'dropdown-spiner' : 'u-hidden' }, _react2.default.createElement('i', {
                      className: 'icon icon-spinner' }),
                    ' Loading...'),

                  (showDeselectall || !this.props.showAll) && (
                  _utils.DataAccess.count(dataView) > 0 || this.isFilterInputKeydown) && !showSpiner ?
                  _react2.default.createElement('div', {
                      disabled: !!this.props.deselectAll,
                      onClick: this.deSelectAll,
                      className: 'deSelectAll ' + (this.props.deselectAll ? '' : 'enabledDeSelectAll') }, 'Clear') :


                  _react2.default.createElement('div', null),


                  showError && errorInfo && !showSpiner && (
                  _utils.DataAccess.count(dataView) > 0 || this.isFilterInputKeydown) && (
                  errorInfoTemplate ? errorInfoTemplate() :
                  _react2.default.createElement('div', { className: 'dropdown-error' }, errorInfo)),


                  showResults && (_utils.DataAccess.count(dataView) > 0 ||
                  this.isFilterInputKeydown) && !(showError && errorInfo) && (
                  results ? results(_utils.DataAccess.count(dataView)) :
                  _react2.default.createElement('div', { className: 'dropdown-results' }, _utils.DataAccess.count(dataView) + ' results')),

                  _utils.DataAccess.count(dataView) === 0 && !showSpiner && !this.isFilterInputKeydown ?
                  _react2.default.createElement('div', { className: 'dropdown-noResult' }, this.props.noResult) : undefined)),



              serverFilter &&
              _react2.default.createElement(_LoadingBar2.default, { spinSize: 'md', className: 'aaui-dropdown__menu-loading ' + (!serverFilterLoading && 'u-hidden') })))));







    } }, { key: 'componentWillUpdate', value: function componentWillUpdate(

































    nextProps, nextState) {
      if (this.props.showCheckbox && nextState.value &&
      _utils.DataAccess.count(this.checkboxArray) > _utils.DataAccess.count(nextState.value)) {
        if (this.state.isExpanded) {
          this.maxItems(nextState.value);
        }
      }

      if (nextProps.data.size > this.props.data.size) {
        var rowState = this.state.rowState;
        nextProps.data.forEach(function (item) {
          if (typeof rowState[_utils.DataAccess.get(item, 'value')] === 'undefined') {
            rowState[_utils.DataAccess.get(item, 'value')] = false;
          }
        });
        this.setState({
          rowState: rowState,
          checkAll: false });

      }

      this.state.serverFilterLoading &&
      this.props.serverFilterTimestamp !== nextProps.serverFilterTimestamp &&
      this.setState({ serverFilterLoading: false });
    } }, { key: 'componentDidMount', value: function componentDidMount()

    {var _this3 = this;
      (0, _defineProperties2.default)(this, {
        value: {
          get: function get() {
            return this.state.value;
          },
          set: function set(v) {
            if (this.props.value === undefined) {
              this.setState({ value: v });
            }
          } } });



      if (this.props.serverFilter && (0, _isFunction2.default)(this.props.serverFilterHandler)) {
        this.debouncedServerFilterHandler = (0, _debounce2.default)(function (keyword) {
          var keywordUpdated = _this3.serverFilterKeyword !== keyword;
          if (keywordUpdated) {
            _this3.serverFilterKeyword = keyword;
            _this3.setState({ serverFilterLoading: true });
            _this3.props.serverFilterHandler(keyword);
          }
        }, 400);
      }
    } }, { key: 'componentWillReceiveProps', value: function componentWillReceiveProps(

    nextProps) {var _this4 = this;
      var newState = {};
      if (nextProps.value !== this.props.value) {
        newState.value = nextProps.value;
      } else if (nextProps.defaultValue !== this.props.defaultValue) {
        newState.value = this.state.value === undefined ?
        nextProps.defaultValue :
        this.state.value;
      }
      if (!_utils.DataAccess.is(nextProps.data, this.props.data)) {
        newState.dataView = nextProps.data;
      }
      if ((0, _keys2.default)(newState).length > 0) this.setState(newState);
      if (this.filterInput && !this.props.isFetchData && nextProps.isFetchData) {
        this.filterInput.value = '';
      }

      if (this.props.showCheckbox && _utils.DataAccess.count(this.props.data) > 0) {
        var rowState = {};
        var values = nextProps.value || [];
        var status = false;

        values.forEach(function (item) {
          _this4.checkboxArray = _this4.checkboxArray.set(item, item);
        });

        this.props.data.forEach(function (item) {
          if (values.indexOf(_utils.DataAccess.get(item, 'value')) > -1) {
            status = true;
            _this4.checkboxArray = _this4.checkboxArray.set(_utils.DataAccess.get(item, 'value'), _utils.DataAccess.get(item, 'value'));
          } else {
            status = false;
          }
          rowState[_utils.DataAccess.get(item, 'value')] = status;
        });
        this.props.serverFilter && nextProps.data.forEach(function (item) {
          if (values.indexOf(_utils.DataAccess.get(item, 'value')) > -1) {
            status = true;
            _this4.checkboxArray = _this4.checkboxArray.set(_utils.DataAccess.get(item, 'value'), _utils.DataAccess.get(item, 'value'));
          } else {
            status = false;
          }
          rowState[_utils.DataAccess.get(item, 'value')] = status;
        });
        this.setState({ rowState: rowState });
      }
    } }, { key: 'componentDidUpdate', value: function componentDidUpdate()

    {
      if (this.state.isExpanded) {
        // this.isFilterInputKeydown is used for judging
        // whether is inputting in filter input at the current time.
        if (!this.isFilterInputKeydown) this.menuWrapper && this.menuWrapper.focus();

        var itemMenu = this.dropdownMenu;
        var activeItem = itemMenu && itemMenu.querySelector('.is-active');
        if (activeItem) {
          var itemMenuHeight = itemMenu.offsetHeight;
          var itemMenuScrollTop = itemMenu.scrollTop;
          var activeItemTop = activeItem.offsetTop;
          var activeItemHeight = activeItem.offsetHeight;
          if (activeItemTop + activeItemHeight - itemMenuHeight - itemMenuScrollTop > 0) {
            itemMenu.scrollTop = activeItemTop + activeItemHeight - itemMenuHeight;
          } else if (activeItemTop < itemMenuScrollTop) {
            itemMenu.scrollTop = activeItemTop;
          }
        }

        if (this.props.showCheckbox) {
          var rowState = this.state.rowState;
          var values = this.state.value || [];
          this.props.data.forEach(function (item) {
            if (values.indexOf(_utils.DataAccess.get(item, 'value')) > -1) {
              rowState[_utils.DataAccess.get(item, 'value')] = true;
            } else {
              rowState[_utils.DataAccess.get(item, 'value')] = false;
            }
          });
          // eslint-disable-next-line react/no-did-update-set-state
          this.setState({
            rowState: rowState });

        }

        var self = this;
        if (this.props.ajaxLoading && this.dropdownMenu && !this.dropdownMenu.onscroll) {
          /* eslint-disable func-names */
          this.dropdownMenu.onscroll = (0, _throttle2.default)(function () {
            var height = this.clientHeight;
            var scrollHeight = this.scrollHeight;
            if (scrollHeight - height - 6 <= this.scrollTop) {
              self.props.ajaxLoading();
            }
          }, 400);
        }
      }
    } }, { key: 'componentWillMount', value: function componentWillMount()











































































































































































































































































































































































































































































































































































































































    {var _this5 = this;
      this.keyboardValue = '';
      this.clearKeyboardValue = (0, _debounce2.default)(function () {_this5.keyboardValue = '';}, 600);
    } }], [{ key: 'checkValueInDataView', value: function checkValueInDataView(value, dataView) {var result = false;for (var len = dataView.length, i = 0; i < len; i += 1) {if (_utils.DataAccess.get(dataView[i], 'value') === value) {result = true;}}return result;} }, { key: 'isCheckAllByValueAndDataView', value: function isCheckAllByValueAndDataView(immutableDataView, rowState) {var dataView = immutableDataView.toJS();var result = false;for (var len = dataView.length, i = 0; i < len; i += 1) {if (rowState[dataView[i].id]) {result = true;} else {result = false;break;}}return result;} }]);return Dropdown;}(_react2.default.PureComponent);Dropdown.displayName = 'Dropdown';Dropdown.defaultProps = DropdownProps;Dropdown.propTypes = DropdownPropTypes;var _initialiseProps = function _initialiseProps() {var _this6 = this;this.decorate = function (item, index) {var isCheck = function isCheck() {return _this6.state.rowState[_utils.DataAccess.get(item, 'value')];};var ccs = index === _this6.state.activeItemIndex ? 'is-active ' : '';var errorInfo = _this6.props.errorInfo ? _this6.props.errorInfo : '';return _this6.props.itemTemplate(item, ccs, isCheck, _this6.check, errorInfo);};this.decorateDeleleTmplate = function (item, index) {var ccs = index === _this6.state.activeItemIndex ? 'is-active ' : '';return _this6.props.deleteitemTemplate(item, ccs, function () {_this6.select(_utils.DataAccess.get(item, 'value'));});};this.maxItems = function (nextValues) {var stateValues = _this6.state.value;var rowState = _this6.state.rowState;for (var len = _utils.DataAccess.count(stateValues), i = 0; i < len; i += 1) {if (nextValues.indexOf(stateValues[i]) === -1) {rowState[stateValues[i]] = false;_this6.setCheckboxArray(stateValues[i], '');}}_this6.setState({ rowState: rowState, isExpanded: true, value: nextValues, checkAll: false, activeItemIndex: -1 });};this.filterCheckItems = function (checkes) {var vlaue = _this6.state.value || '';var checkboxArray = null;checkes.forEach(function (item) {if (Object.prototype.toString.call(item) === '[object Object]') {checkes.push(item);} else if (vlaue.indexOf(item) === -1) {checkboxArray = _this6.setCheckboxArray(item, '');}});return checkboxArray == null ? checkes : checkboxArray;};this.getCheckValue = function (checkes) {var result = [];checkes.forEach(function (item) {if (Object.prototype.toString.call(item) === '[object Object]') {result.push(item.value);} else if (item !== '') {result.push(item);}});return { value: result, checkedItems: _this6.findCheckedItemsByValue(checkes) };};this.findCheckedItemsByValue = function (checkes) {if (_utils.DataAccess.count(_this6.props.data) === 0) return undefined;var data = _this6.props.data.filter(function (item) {return checkes.get(_utils.DataAccess.get(item, 'value')) !== undefined;});return data;};this.findMutiTextByValue = function () {var values = _this6.props.value || [];var dataViewLength = _utils.DataAccess.count(_this6.props.data);var len = _this6.props.selectedFilteredItems ? _utils.DataAccess.count(_this6.props.selectedFilteredItems) : _utils.DataAccess.count(values);if (_this6.props.showDeselectall && _this6.props.deselectAll && dataViewLength > 0) {return 'All';} else if (len === 1 && _this6.props.showTxtOnlyCheckedOneItem) {return _this6.findTextByValue(values[0]);}return len ? len + ' ' + _this6.props.txtSuffix : undefined;};this.isAllChecked = function (checkedState) {var rowState = checkedState || _this6.state.rowState;var items = (0, _keys2.default)(rowState);if (items.some(function (item) {return !_this6.state.rowState[item];})) {return false;}return items.length > 0;};this.setCheckboxArray = function (key, value) {if (_this6.checkboxArray.has(key)) {if (value === '') {_this6.checkboxArray = _this6.checkboxArray.delete(key);} else {_this6.checkboxArray = _this6.checkboxArray.update(key, function (val) {return val;});}} else {_this6.checkboxArray = _this6.checkboxArray.set(key, value);}return _this6.checkboxArray;};this.isAllFilterDataViewChecked = function (dataView) {if (dataView.some(function (item) {return !_this6.state.rowState[_utils.DataAccess.get(item, 'value')];})) {return false;}return dataView.length > 0;};this.check = function (val, index) {_this6.state.rowState[val] = !_this6.state.rowState[val];var tempVal = _this6.state.rowState[val] ? val : '';_this6.checkboxArray = _this6.setCheckboxArray(val, tempVal);var checkedObj = _this6.getCheckValue(_this6.checkboxArray);var checkAll = false; // just for judge the filter list, and then set filter conditionally
    if (_this6.state.dataView.size !== _this6.props.data.size) {checkAll = _this6.isAllFilterDataViewChecked(_this6.state.dataView);} else {checkAll = !_this6.state.rowState[val] ? false : _this6.isAllChecked();}_this6.setState({ value: checkedObj.value, isExpanded: true, activeItemIndex: index !== undefined ? _this6.state.activeItemIndex : -1, rowState: _this6.state.rowState, checkAll: checkAll }, function () {if (_this6.props.onChange) _this6.props.onChange(checkedObj);});};this.getAllValues = function (isCheckAll) {if (isCheckAll !== 'deSelectAll' && _this6.state.checkAll) {_this6.state.dataView.forEach(function (item) {_this6.checkboxArray = _this6.setCheckboxArray(_utils.DataAccess.get(item, 'value'), _utils.DataAccess.get(item, 'value'));});} else if (_this6.props.selectedFilteredItems) {var params = _this6.props.selectedFilteredItems.toJS();for (var i = 0, len = params.length; i < len; i += 1) {_this6.checkboxArray = _this6.checkboxArray.delete(params[i]);}} else if (_this6.state.dataView.size !== _this6.props.data.size || _this6.state.value.length > _this6.state.dataView.size) {// just for judge the filter list, and then set filter conditionally
      _this6.state.dataView.forEach(function (item) {_this6.checkboxArray = _this6.checkboxArray.delete(_utils.DataAccess.get(item, 'value'));});} else {_this6.checkboxArray = (0, _immutable.OrderedMap)({});}return _this6.checkboxArray;};this.deSelectAll = function () {var rowState = {};(0, _keys2.default)(_this6.state.rowState).forEach(function (item) {if (_this6.props.selectedFilteredItems) {var deSelectAllParams = _this6.props.selectedFilteredItems.toJS();if (deSelectAllParams.indexOf(item) > -1) {rowState[item] = false;}}if (!_this6.props.selectedFilteredItems) {rowState[item] = false;}});var checkedObj = _this6.getCheckValue(_this6.getAllValues('deSelectAll'));_this6.setState({ isExpanded: true, value: checkedObj.value, rowState: rowState }, function () {if (_this6.props.onChange) _this6.props.onChange(checkedObj);});};this.checkAll = function () {if (_this6.props.errorInfo && _this6.props.errorInfo.length > 0) return false;var rowState = {};var checkState = !_this6.state.checkAll; // just for judge the filter list, and then set filter conditionally
    if (_this6.state.dataView.size !== _this6.props.data.size) {_this6.state.dataView.forEach(function (item) {rowState[_utils.DataAccess.get(item, 'value')] = checkState;});} else if (_this6.state.value.length > _this6.state.dataView.size) {// just for judge resource dropdownlist
      var isValueInDataView = false;var dataView = _this6.state.dataView.toJS();(0, _keys2.default)(_this6.state.rowState).forEach(function (item) {isValueInDataView = Dropdown.checkValueInDataView(item, dataView);if (isValueInDataView) {rowState[item] = checkState;}});} else {(0, _keys2.default)(_this6.state.rowState).forEach(function (item) {rowState[item] = checkState;});}_this6.state.checkAll = checkState;var checkedObj = _this6.getCheckValue(_this6.getAllValues());_this6.setState({ value: checkedObj.value, rowState: rowState, checkAll: _this6.state.checkAll }, function () {if (_this6.props.onChange) _this6.props.onChange(checkedObj);});return false;};this.resetRowState = function () {var _state2 = _this6.state,value = _state2.value,rowState = _state2.rowState;(0, _keys2.default)(rowState).forEach(function (item) {if (value.indexOf(parseInt(item, 10)) === -1) {rowState[item] = false;}});};this.isValueChanged = function () {var _state3 = _this6.state,initValue = _state3.initValue,value = _state3.value;var showCheckbox = _this6.props.showCheckbox; // for case:  initValue = '1'   value = '2'
    if (!showCheckbox) {return initValue !== value;}initValue = initValue || [];value = value || []; // for case: same length and not same squence => initValue = [1, 2, 3]   value = [2, 3, 1]
    if (initValue.length === value.length) {var diff = (0, _difference2.default)(initValue, value);return !!diff.length;}return true;};this.onMenuHide = function () {var isExpanded = _this6.state.isExpanded;var isValueChanged = _this6.isValueChanged();if (!isExpanded && _this6.props.onMenuHide) {_this6.props.onMenuHide.call(_this6, isValueChanged);}if (isExpanded && _this6.filterInput) {_this6.filterInput.focus();}};this.toggleMenu = function () {clearTimeout(_this6._timer);if (_this6.filterInput) {if (_this6.props.isFetchData) {_this6.filterInput.value = '';}if (_this6.state.isExpanded) {_this6.isFilterInputKeydown = false;}}var rowState = {};var checkAll = false;var self = _this6;var _props2 = _this6.props,showCheckbox = _props2.showCheckbox,data = _props2.data;if (showCheckbox) {if (_utils.DataAccess.count(data) > 0) {var values = _this6.props.value || [];var checked = false;data.forEach(function (item) {var val = _utils.DataAccess.get(item, 'value');if (values.indexOf(val) >= 0) {checked = true;self.checkboxArray = self.checkboxArray.set(val, val);} else {checked = false;}rowState[val] = checked;});checkAll = _this6.isAllChecked();} else {_this6.resetRowState();rowState = _this6.state.rowState;}var dataView = void 0;if (_this6.filterInput && !_this6.props.serverFilter) {dataView = _this6.filterData(_this6.filterInput.value, _this6.props.data);} else {dataView = _this6.props.data;}rowState = _this6.checkedRowstate(rowState); // for loading resources with ajax;
      if (_this6.checkboxArray && _this6.checkboxArray.size < _this6.state.value.length) {var val = _this6.state.value;for (var len = val.length, i = 0; i < len; i += 1) {_this6.setCheckboxArray(val[i], val[i]);}if (dataView.size < _this6.state.value.length) {checkAll = Dropdown.isCheckAllByValueAndDataView(dataView, rowState);}} // end
      _this6.checkboxArray = _this6.filterCheckItems(_this6.checkboxArray);if (_this6.state.isExpanded) {_this6.setState({ isExpanded: !_this6.state.isExpanded, dataView: dataView, rowState: rowState, checkAll: checkAll, value: _this6.state.value }, _this6.onMenuHide);} else {_this6.setState({ isExpanded: !_this6.state.isExpanded, dataView: dataView, rowState: rowState, checkAll: checkAll, value: _this6.state.value, initValue: _this6.state.value });}} else if (_this6.state.isExpanded) {_this6.setState({ isExpanded: !_this6.state.isExpanded }, _this6.onMenuHide);} else {_this6.setState({ isExpanded: !_this6.state.isExpanded, initValue: _this6.state.value });}};this.checkedRowstate = function (rowState) {var val = _this6.state.value || [];var checkedRowState = rowState;for (var len = val.length, i = 0; i < len; i += 1) {if (!checkedRowState[val[i]]) {checkedRowState[val[i]] = true;}}return checkedRowState;};this.tryCollapse = function () {if (_this6.state.isExpanded) {_this6._timer = setTimeout(function () {_this6.setState({ isExpanded: false }, _this6.onMenuHide);}, 100);}};this.cancelCollapseTimeout = function () {clearTimeout(_this6._timer);};this.giveFocus = function (e) {if (e.target === _this6.menuWrapper) {_this6.menuWrapper.focus();}};this.navigateByKeys = function (e) {var keyCode = e.keyCode || e.which; //  focus next component if there are many input,
    // dropdown or others component on the screen when pressing tab.
    if (keyCode === 9 || [38, 40, 13, 27, 32].indexOf(keyCode) === -1) {return;}e.preventDefault();var isExpanded = _this6.state.isExpanded;switch (keyCode) {case _consts.KeyCode.UP:_this6.setState({ activeItemIndex: _this6.state.activeItemIndex - 1 >= 0 ? _this6.state.activeItemIndex - 1 : _utils.DataAccess.count(_this6.state.dataView) - 1, isExpanded: true });break;case _consts.KeyCode.DOWN:_this6.setState({ activeItemIndex: _this6.state.activeItemIndex + 1 < _utils.DataAccess.count(_this6.state.dataView) ? _this6.state.activeItemIndex + 1 : 0, isExpanded: true });break;case _consts.KeyCode.ENTER:{if (isExpanded) {var _state4 = _this6.state,dataView = _state4.dataView,activeItemIndex = _state4.activeItemIndex;if (_this6.props.showCheckbox) {_this6.setState({ isExpanded: false, activeItemIndex: _this6.state.activeItemIndex }, _this6.onMenuHide);_this6.ignoreFocus = true;_this6.dropdownButton.focus();} else if (activeItemIndex >= 0) {var item = _utils.DataAccess.get(dataView, activeItemIndex);var value = item ? _utils.DataAccess.get(item, 'value') : null;if (value !== null) {_this6.select(value);}_this6.ignoreFocus = true;_this6.dropdownButton.focus();}} else {_this6.setState({ isExpanded: true, activeItemIndex: _this6.state.activeItemIndex });}break;}case _consts.KeyCode.ESCAPE:_this6.setState({ isExpanded: false, activeItemIndex: _this6.state.activeItemIndex }, _this6.props.showCheckbox ? _this6.onMenuHide : undefined);_this6.ignoreFocus = true;_this6.dropdownButton.focus();break;case _consts.KeyCode.SPACE:if (isExpanded) {return; /* eslint no-useless-return: 0 */} else {/* eslint no-else-return: 0 */_this6.setState({ isExpanded: true, activeItemIndex: _this6.state.activeItemIndex });}break;default:break;}};this.applyActive = function (e) {if (_this6.props.filter && e.target === _this6.filterInput) return false;var keyCode = e.keyCode || e.which;var charStr = String.fromCharCode(keyCode);_this6.keyboardValue = _this6.keyboardValue + charStr.toUpperCase();_this6.filterFromKeyboard();return false;};this.clearKeyboard = function (e) {e.persist();_this6.clearKeyboardValue(e);};this.filterFromKeyboard = function () {var result = _this6.getIndex(_this6.keyboardValue);if (result.isFound) {_this6.setState({ activeItemIndex: result.index, keyWords: result.keyWords });}};this.getIndex = function (str) {var dataArray = _this6.state.dataView.toJS ? _this6.state.dataView.toJS() : _this6.state.dataView;var index = 0;var value = '';var length = _utils.DataAccess.count(dataArray);var isFound = false;var keyWords = '';var i = 0;for (; i < length; i += 1) {value = _utils.DataAccess.get(dataArray[i], 'text');if (value.toUpperCase().indexOf(str) === 0) {index = i;isFound = true;keyWords = str;break;}}return { index: index, isFound: isFound, keyWords: keyWords };};this.applyFilter = function (e) {var keyword = e.target.value;if (!_this6.props.serverFilter) {return _this6.doClientFilter(keyword);} // do server filter
    return _this6.debouncedServerFilterHandler(keyword);};this.doClientFilter = function (key) {var dataView = _this6.filterData(key, _this6.props.data);var showClearFilterIcon = false;if (key.length > 0) {showClearFilterIcon = true;}if (_this6.props.showCheckbox) {var rowState = {};dataView.forEach(function (item) {rowState[_utils.DataAccess.get(item, 'value')] = _this6.state.rowState[_utils.DataAccess.get(item, 'value')];});_this6.setState({ dataView: dataView, checkAll: _this6.isAllChecked(rowState), showClearFilterIcon: showClearFilterIcon });} else {_this6.setState({ dataView: dataView, showClearFilterIcon: showClearFilterIcon });}};this.clearFilter = function () {_this6.filterInput.value = '';if (_this6.props.onClearFilter) {_this6.props.onClearFilter();}var rowState = {};var values = _this6.props.value;var status = false;var self = _this6;_this6.props.data.forEach(function (item) {if (values.indexOf(_utils.DataAccess.get(item, 'value')) > -1) {status = true;self.checkboxArray = self.checkboxArray.set(_utils.DataAccess.get(item, 'value'), _utils.DataAccess.get(item, 'value'));} else {status = false;}rowState[_utils.DataAccess.get(item, 'value')] = status;});var checkAll = _this6.isAllChecked();_this6.checkboxArray = _this6.filterCheckItems(_this6.checkboxArray);_this6.setState({ dataView: _this6.props.data, rowState: rowState, checkAll: checkAll, value: _this6.state.value, showClearFilterIcon: false });};this.handleKeys = function (e) {_this6.isFilterInputKeydown = true;if (_this6.props.filterKeyDown) {_this6.props.filterKeyDown();} // Delegate up, down, and escape to itemMenu.
    if ([38, 40, 27].indexOf(e.keyCode) > -1) return; // Delegate enter to itemMenu if up/down selections are already made.
    if (e.keyCode === 13 && _this6.state.activeItemIndex > -1) return;e.stopPropagation();};this.select = function (value) {var val = _this6.props.value !== undefined ? _this6.state.value : value;_this6.setState({ value: val, isExpanded: false, activeItemIndex: -1 }, function () {if (_this6.props.onChange) _this6.props.onChange({ value: value });});};this.findItemByValue = function (value) {if (_utils.DataAccess.count(_this6.props.data) === 0) return undefined;var data = _this6.props.data.toJS ? _this6.props.data.toJS() : _this6.props.data;return (0, _find2.default)(data, function (item) {return _utils.DataAccess.get(item, 'value') === value;});};this.findTextByValue = function (value) {var item = _this6.findItemByValue(value);if (item) {return _utils.DataAccess.get(item, 'text');}return undefined;};this.filterData = function (key, dataset) {var k = key.trim().toLowerCase();var klen = k.length;var matcher = void 0;if (!_this6.props.fuzzyQuery) {matcher = function matcher(item) {var t = _utils.DataAccess.get(item, 'text').trim().toLowerCase();if (t.indexOf(k) > -1) return true;return false;};} else {matcher = function matcher(item) {var t = _utils.DataAccess.get(item, 'text').trim().toLowerCase();var tlen = t.length;if (tlen < klen) {return false;}for (var i = 0; i < tlen; i += 1) {if (t.charAt(i) === k.charAt(i) && i + 1 >= klen) {return true;}}return false;};}return !k ? dataset : dataset.filter(matcher);};this.cleanActivedItem = function () {_this6.setState({ activeItemIndex: -1 }, _this6.get);};};exports.default = Dropdown;module.exports = exports['default'];