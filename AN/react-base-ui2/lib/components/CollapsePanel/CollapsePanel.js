'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _isString = require('lodash/isString');var _isString2 = _interopRequireDefault(_isString);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _Tabbable = require('../../services/wcag/Tabbable');var _Tabbable2 = _interopRequireDefault(_Tabbable);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                          * @description Default PropTypes of CollapsePanel.
                                                                                                                                                                                                          * @memberof CollapsePanel
                                                                                                                                                                                                          */
var CollapsePanelPropTypes = {
  /**
                                * child content of CollapsePanel
                                */
  children: _propTypes2.default.node.isRequired,
  /**
                                                  * customize class for CollapsePanel section
                                                  */
  className: _propTypes2.default.string,
  /**
                                          * expanded icon of CollapsePanel panel
                                          */
  expandedIcon: _propTypes2.default.string,
  /**
                                             * collapsed icon of CollapsePanel panel
                                             */
  collapsedIcon: _propTypes2.default.string,
  /**
                                              * define collapse/expanded transition, just have a transition on attribute of 'height'
                                              * @example
                                              * <CollapsePanel transition='height 0.2s linear'></CollapsePanel>
                                              */
  transition: _propTypes2.default.string,
  /**
                                           * define what title will be display on collapse panel
                                           */
  title: _propTypes2.default.string,
  /**
                                      * define what summary will be display on collapse panel
                                      */
  summary: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
  /**
                                                                                                      * define what aria-label will be set on collapse panel
                                                                                                      */
  ariaLabel: _propTypes2.default.string,
  /**
                                          * a callback function after expanded
                                          */
  onExpand: _propTypes2.default.func,
  /**
                                       * a callback function after collapsed
                                       */
  onCollapse: _propTypes2.default.func };


var CollapsePanelProps = {
  className: '',
  title: '',
  summary: '',
  transition: 'none',
  ariaLabel: null,
  onExpand: function onExpand() {},
  onCollapse: function onCollapse() {},
  expandedIcon: 'icon-chevron-up',
  collapsedIcon: 'icon-chevron-down' };


/**
                                         * UI component of CollapsePanel
                                         */var
CollapsePanel = function (_React$Component) {(0, _inherits3.default)(CollapsePanel, _React$Component);





  function CollapsePanel(props) {(0, _classCallCheck3.default)(this, CollapsePanel);var _this = (0, _possibleConstructorReturn3.default)(this, (CollapsePanel.__proto__ || (0, _getPrototypeOf2.default)(CollapsePanel)).call(this,
    props));var _props$expanded =

    props.expanded,expanded = _props$expanded === undefined ? false : _props$expanded;
    _this.state = {
      expanded: expanded,
      height: 0 };


    _this.handleToggle = _this.handleToggle.bind(_this);return _this;
  }(0, _createClass3.default)(CollapsePanel, [{ key: 'componentWillReceiveProps', value: function componentWillReceiveProps(

    nextProps) {
      if ('expanded' in nextProps) {var
        expanded = nextProps.expanded;
        this.setState({
          expanded: expanded,
          height: this.getHeight(expanded) });

      }
    } }, { key: 'getHeight', value: function getHeight(

    nextState) {
      return nextState ? this.content.offsetHeight : 0;
    } }, { key: 'handleToggle', value: function handleToggle()

    {var
      expanded = this.state.expanded;var _props =
      this.props,onExpand = _props.onExpand,onCollapse = _props.onCollapse;
      var nowExpanded = !expanded;

      this.setState({
        expanded: nowExpanded,
        height: this.getHeight(nowExpanded) },
      function () {
        if (nowExpanded) {
          onExpand(nowExpanded);
        } else {
          onCollapse(nowExpanded);
        }
      });
    } }, { key: 'render', value: function render()

    {var _this2 = this;var _state =
      this.state,expanded = _state.expanded,height = _state.height;var _props2 =

      this.props,title = _props2.title,className = _props2.className,expandedIcon = _props2.expandedIcon,collapsedIcon = _props2.collapsedIcon,summary = _props2.summary,transition = _props2.transition,ariaLabel = _props2.ariaLabel;
      var style = void 0;
      var animate = transition && (0, _isString2.default)(transition) && transition !== 'none';
      if (!animate) {
        style = {};
      } else {
        style = {
          transition: transition,
          height: height + 'px' };

      }

      return (
        _react2.default.createElement('section', { className: 'collapse-panel ' + className, role: 'region' },
          _react2.default.createElement('div', { className: 'collapse-panel__header' },
            _react2.default.createElement(_Tabbable2.default, {
                'aria-label': ariaLabel || title,
                'aria-expanded': expanded,
                onClick: this.handleToggle },

              _react2.default.createElement('span', { className: 'collapse-panel__title' },
                title,
                _react2.default.createElement('i', {
                  className: 'icon ' + (expanded ? expandedIcon : collapsedIcon) }))),



            summary &&
            _react2.default.createElement('div', { className: 'collapse-panel__summary' },
              summary)),



          _react2.default.createElement('div', {
              className: 'collapse-panel__body ' + (expanded ? 'expanded' : 'collapsed') + ' ' + (!animate && !expanded ? 'hidden' : ''),
              style: style },

            _react2.default.createElement('div', {
                className: 'collapse-panel__content',
                ref: function ref(el) {_this2.content = el;} },

              this.props.children))));




    } }]);return CollapsePanel;}(_react2.default.Component);CollapsePanel.displayName = 'CollapsePanel';CollapsePanel.defaultProps = CollapsePanelProps;CollapsePanel.propTypes = CollapsePanelPropTypes;exports.default =


CollapsePanel;module.exports = exports['default'];