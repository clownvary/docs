'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _defineProperty2 = require('babel-runtime/helpers/defineProperty');var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _propTypes = require('prop-types');
var _uniqueId = require('lodash/uniqueId');var _uniqueId2 = _interopRequireDefault(_uniqueId);
var _isNil = require('lodash/isNil');var _isNil2 = _interopRequireDefault(_isNil);
var _find = require('lodash/find');var _find2 = _interopRequireDefault(_find);

var _Tab = require('./Tab');var _Tab2 = _interopRequireDefault(_Tab);
var _TabPanel = require('./TabPanel');var _TabPanel2 = _interopRequireDefault(_TabPanel);
var _consts = require('./consts');
var _Size = require('../..//consts/Size');
var _shallowEqual = require('../../utils/shallowEqual');var _shallowEqual2 = _interopRequireDefault(_shallowEqual);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


var TabsPropTypes = {
  /**
                       * Id property for Tabs container,
                       * if not specified, will generate a unique id automatically.
                       */
  id: _propTypes.string,
  /**
                          * Child Node, will be used as TabPanel's children.
                         */
  children: _propTypes.node,
  /**
                              * Custom CSS class for Tabs container.
                              */
  className: _propTypes.string,
  /**
                                 * Control which tab is selected.
                                 */
  selectedId: _propTypes.string,
  /**
                                  * Determines the size of Tabs.
                                  */
  size: (0, _propTypes.oneOf)([_Size.Size3.SMALL, _Size.Size3.MEDIUM, _Size.Size3.LARGE]),
  /**
                                                                                            * A callback function called when a tab clicked.
                                                                                            */
  onChange: _propTypes.func };


var TabsProps = {
  size: _Size.Size3.MEDIUM };var


Tabs = function (_React$Component) {(0, _inherits3.default)(Tabs, _React$Component);




  function Tabs(props) {(0, _classCallCheck3.default)(this, Tabs);var _this = (0, _possibleConstructorReturn3.default)(this, (Tabs.__proto__ || (0, _getPrototypeOf2.default)(Tabs)).call(this,
    props));_initialiseProps.call(_this);var _this$props =

    _this.props,id = _this$props.id,selectedId = _this$props.selectedId;
    _this.id = id || (0, _uniqueId2.default)('' + _consts.TabsClasses.TABS);
    _this.state = { selectedId: selectedId };return _this;
  }(0, _createClass3.default)(Tabs, [{ key: 'componentWillMount', value: function componentWillMount()

    {
      this.updateSelection();
    } }, { key: 'componentWillReceiveProps', value: function componentWillReceiveProps(_ref)

    {var selectedId = _ref.selectedId;
      if (selectedId !== this.props.selectedId && this.isSelectable(selectedId)) {
        this.updateSelection(selectedId);
      }
    } }, { key: 'componentDidUpdate', value: function componentDidUpdate(

    prevProps) {
      if (this.isChildrenChanged(prevProps)) {
        this.updateSelection();
        this.forceUpdate();
      }
    } }, { key: 'isSelectable', value: function isSelectable(

    id) {
      return !(0, _isNil2.default)(id) && _react2.default.Children.toArray(this.props.children).some(function (child) {return (
          _Tab2.default.isInstance(child) &&
          id === child.props.id &&
          !child.props.disabled);});

    } }, { key: 'isChildrenChanged', value: function isChildrenChanged(

    prevProps) {
      var tabsProps = _react2.default.Children.toArray(this.props.children).
      filter(function (child) {return _Tab2.default.isInstance(child);}).
      map(function (_ref2) {var props = _ref2.props;return props;});
      var prevTabsProps = _react2.default.Children.toArray(prevProps.children).
      filter(function (child) {return _Tab2.default.isInstance(child);}).
      map(function (_ref3) {var props = _ref3.props;return props;});
      if (tabsProps.length !== prevTabsProps.length) {
        return true;
      }

      return tabsProps.some(function (tabProps, i) {
        var prevTabProps = prevTabsProps[i];
        return !(0, _shallowEqual2.default)(prevTabProps, tabProps);
      });
    } }, { key: 'generateChildId', value: function generateChildId(

    key) {var
      id = this.props.id;
      return (id || this.id) + '_tab' + key;
    } }, { key: 'renderTabList', value: function renderTabList()

























    {var _this2 = this;var
      children = this.props.children;
      return _react2.default.Children.map(
      children,
      function (child, i) {var _child$props =
        child.props,id = _child$props.id,title = _child$props.title,disabled = _child$props.disabled;
        var tabId = id || _this2.generateChildId(i);

        return _Tab2.default.isInstance(child) ?
        _react2.default.createElement(_Tab2.default, {
          key: i,
          id: tabId,
          title: title,
          onClick: _this2.onSelected,
          disabled: disabled,
          selected: tabId === _this2.state.selectedId && !disabled }) :
        undefined;
      });

    } }, { key: 'renderTabPanels', value: function renderTabPanels()

    {var _this3 = this;var
      children = this.props.children;
      return _react2.default.Children.toArray(children).filter(function (child) {return (
          _Tab2.default.isInstance(child));}).
      map(function (child, i) {var _child$props2 =
        child.props,id = _child$props2.id,panelClass = _child$props2.panelClass,disabled = _child$props2.disabled,tabChildren = _child$props2.children;
        var tabId = id || _this3.generateChildId(i);

        return (
          _react2.default.createElement(_TabPanel2.default, {
              key: i,
              id: tabId,
              className: panelClass,
              disabled: disabled,
              selected: tabId === _this3.state.selectedId && !disabled },

            tabChildren));


      });
    } }, { key: 'render', value: function render()

    {var _props =
      this.props,id = _props.id,className = _props.className,size = _props.size;
      var classes = (0, _classnames2.default)(
      _consts.TabsClasses.TABS,
      className, (0, _defineProperty3.default)({},

      _consts.TabsClasses.TABS + '-' + size, size));



      return (
        _react2.default.createElement('div', {
            className: classes,
            id: id || this.id },

          _react2.default.createElement('div', {
              className: _consts.TabsClasses.TAB_LIST,
              role: 'tablist' },

            this.renderTabList()),

          this.renderTabPanels()));


    } }]);return Tabs;}(_react2.default.Component);Tabs.displayName = 'Tabs';Tabs.propTypes = TabsPropTypes;Tabs.defaultProps = TabsProps;var _initialiseProps = function _initialiseProps() {var _this4 = this;this.onSelected = function (selectedId, e) {var onChange = _this4.props.onChange;if (onChange) {onChange(selectedId, e);}_this4.updateSelection(selectedId);};this.updateSelection = function (id) {var selectedId = id || _this4.state.selectedId;if (!_this4.isSelectable(selectedId)) {var index = 0;var tabs = _react2.default.Children.toArray(_this4.props.children);var tab = (0, _find2.default)(tabs, function (t, i) {index = i;return _Tab2.default.isInstance(t) && !t.props.disabled;});selectedId = tab && (tab.props.id || _this4.generateChildId(index));}_this4.setState({ selectedId: selectedId });};};exports.default = Tabs;module.exports = exports['default'];