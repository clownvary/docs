'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _defineProperty2 = require('babel-runtime/helpers/defineProperty');var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _consts = require('../../consts');
var _dom = require('../../utils/dom');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                     * Default PropTypes for Panel
                                                                                                                                     */
var propTypes = {
  /**
                   * customize class for Collapse section
                   */
  className: _propTypes2.default.oneOfType([
  _propTypes2.default.string,
  _propTypes2.default.object]),

  Header: _propTypes2.default.oneOfType([
  _propTypes2.default.string,
  _propTypes2.default.number,
  _propTypes2.default.node]),

  /**
                               * content of the panel
                               */
  content: _propTypes2.default.oneOfType([
  _propTypes2.default.string,
  _propTypes2.default.number,
  _propTypes2.default.node]),

  /**
                               * If true, panel cannot be opened or closed
                               */
  disabled: _propTypes2.default.bool,
  /**
                                       * Determines the aria-label text on expanded
                                       */
  ariaLableExpand: _propTypes2.default.string,
  /**
                                                * Determines the aria-label text on collapsed
                                                */
  ariaLableCollapse: _propTypes2.default.string };var


Panel = function (_React$Component) {(0, _inherits3.default)(Panel, _React$Component);function Panel() {var _ref;var _temp, _this, _ret;(0, _classCallCheck3.default)(this, Panel);for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Panel.__proto__ || (0, _getPrototypeOf2.default)(Panel)).call.apply(_ref, [this].concat(args))), _this), _this.








    handleItemClick = function (e) {
      e && e.preventDefault();var
      onItemClick = _this.props.onItemClick;
      onItemClick();
    }, _this.





    onPanelHeaderKeyDown = function (e) {
      var keyCode = e.keyCode || e.which;var
      prefixCls = _this.props.prefixCls;
      var headerClass = prefixCls + '-item__header';
      var isEnterOrSpace = keyCode === _consts.KeyCode.ENTER || keyCode === _consts.KeyCode.SPACE;

      if (isEnterOrSpace) {
        if ((0, _dom.hasClass)(e.target, headerClass)) {
          _this.handleItemClick(e);
          return _this.props.onPanelHeaderKeyDown(e, keyCode);
        }
      }

      return _this.props.onPanelHeaderKeyDown(e, keyCode);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);}(0, _createClass3.default)(Panel, [{ key: 'handleHeaderClick', value: function handleHeaderClick(e) {e.stopPropagation();} }, { key: 'renderDefaultHeader', value: function renderDefaultHeader()

    {var
      Header = this.props.Header;

      return (
        _react2.default.createElement('div', { onClick: this.handleHeaderClick },
          Header,
          _react2.default.createElement('i', {
            className: 'icon icon-chevron-down',
            onClick: this.handleItemClick })));



    } }, { key: 'render', value: function render()

    {var _classNames, _classNames2;var _props =











      this.props,prefixCls = _props.prefixCls,Header = _props.Header,className = _props.className,content = _props.content,isActive = _props.isActive,disabled = _props.disabled,children = _props.children,ariaLableExpand = _props.ariaLableExpand,ariaLableCollapse = _props.ariaLableCollapse,isPanelHeaderFocusable = _props.isPanelHeaderFocusable;

      var panelCls = (0, _classnames2.default)((_classNames = {}, (0, _defineProperty3.default)(_classNames,
      prefixCls + '-item', true), (0, _defineProperty3.default)(_classNames,
      'is-expanded', isActive), _classNames),
      className);

      var headerCls = (0, _classnames2.default)((_classNames2 = {}, (0, _defineProperty3.default)(_classNames2,
      prefixCls + '-item__header', true), (0, _defineProperty3.default)(_classNames2,
      'is-disabled', disabled), (0, _defineProperty3.default)(_classNames2,
      'is-focusable', isPanelHeaderFocusable), _classNames2));

      return (
        _react2.default.createElement('div', { className: panelCls },
          _react2.default.createElement('a', {
              className: headerCls,
              'aria-disabled': disabled,
              tabIndex: disabled ? -1 : 0,
              href: 'javascript:void(0)' // eslint-disable-line
              , onClick: this.handleItemClick,
              onKeyDown: this.onPanelHeaderKeyDown,
              'aria-label': isActive ? ariaLableExpand : ariaLableCollapse,
              role: 'button',
              'aria-expanded': isActive },


            (0, _isFunction2.default)(Header) ?
            _react2.default.createElement(Header, { onToggleClick: this.handleItemClick }) :

            this.renderDefaultHeader()),



          _react2.default.createElement('div', {
              className: prefixCls + '-item__content' },

            children || content)));



    } }]);return Panel;}(_react2.default.Component);Panel.propTypes = propTypes;Panel.defaultProps = { headerButtonId: 'default', onItemClick: function onItemClick() {}, isActive: false };exports.default =


Panel;module.exports = exports['default'];