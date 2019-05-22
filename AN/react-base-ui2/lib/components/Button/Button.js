'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _defineProperty2 = require('babel-runtime/helpers/defineProperty');var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _omit = require('lodash/omit');var _omit2 = _interopRequireDefault(_omit);
var _propTypes = require('prop-types');
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _menu = require('../../services/menu');
var _ButtonType = require('./consts/ButtonType');var _ButtonType2 = _interopRequireDefault(_ButtonType);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
/**
                                                                                                                                                                                                       * Default PropTypes of Button.
                                                                                                                                                                                                       */
var ButtonPropTypes = {
  /**
                         * Determines whether the button is a not a Submit button.
                        */
  noSubmit: _propTypes.bool,
  /**
                              * Whether or not to show loading icon.
                             */
  loading: _propTypes.bool,
  /**
                             * Determines the button type.
                            */
  type: _propTypes.string,
  /**
                            * Determines the button size.
                            */
  size: _propTypes.string,
  /**
                            * Whether or not to disable button.
                            */
  disabled: _propTypes.bool,
  /**
                              * Custom class name.
                             */
  className: _propTypes.string,
  /**
                                 * Child Node
                                */
  children: _propTypes.node,

  /**
                              * Menu data list.
                              */
  menuData: (0, _propTypes.arrayOf)((0, _propTypes.shape)({
    text: _propTypes.string.isRequired,
    value: (0, _propTypes.oneOfType)([_propTypes.number, _propTypes.string]).isRequired })),


  /**
                                                                                              * Triger the functtion when select menu item.
                                                                                              */
  onMenuSelect: _propTypes.func,

  /**
                                  * Triger the functtion when click button.
                                  */
  onClick: _propTypes.func,

  /**
                             * Triger the function when hover button.
                             */
  onMouseHover: _propTypes.func,

  /**
                                  * Triger the function when enter button.
                                  */
  onMouseEnter: _propTypes.func,

  /**
                                  * Triger the function when leave button.
                                  */
  onMouseLeave: _propTypes.func };



/** Default Props for Buttons */
var ButtonProps = {
  noSubmit: false,
  loading: false,
  type: _ButtonType2.default.SECONDARY,
  menuData: [] };



/** UI component that displays Button with variant settings.*/var
Button = function (_React$PureComponent) {(0, _inherits3.default)(Button, _React$PureComponent);




  function Button(props) {(0, _classCallCheck3.default)(this, Button);var _this = (0, _possibleConstructorReturn3.default)(this, (Button.__proto__ || (0, _getPrototypeOf2.default)(Button)).call(this,
    props));

    _this.onClick = _this.onClick.bind(_this);
    _this.onMouseOver = _this.onMouseOver.bind(_this);
    _this.onMouseEnter = _this.onMouseEnter.bind(_this);
    _this.onMouseLeave = _this.onMouseLeave.bind(_this);return _this;
  }(0, _createClass3.default)(Button, [{ key: 'onClick', value: function onClick(

    e) {var _props =
      this.props,onClick = _props.onClick,id = _props.id;
      (0, _isFunction2.default)(onClick) && onClick(e, { id: id });
    } }, { key: 'onMouseOver', value: function onMouseOver(

    e) {var _props2 =
      this.props,onMouseHover = _props2.onMouseHover,id = _props2.id;
      (0, _isFunction2.default)(onMouseHover) && onMouseHover(e, { id: id });
    } }, { key: 'onMouseEnter', value: function onMouseEnter(

    e) {var _props3 =
      this.props,onMouseEnter = _props3.onMouseEnter,id = _props3.id;
      (0, _isFunction2.default)(onMouseEnter) && onMouseEnter(e, { id: id });
    } }, { key: 'onMouseLeave', value: function onMouseLeave(

    e) {var _props4 =
      this.props,onMouseLeave = _props4.onMouseLeave,id = _props4.id;
      (0, _isFunction2.default)(onMouseLeave) && onMouseLeave(e, { id: id });
    } }, { key: 'componentDidMount', value: function componentDidMount()

    {var _props5 =
      this.props,menuData = _props5.menuData,onMenuSelect = _props5.onMenuSelect,id = _props5.id;

      if (menuData && menuData.length) {
        (0, _menu.attachPopupMenu)(
        id,
        {
          data: menuData,
          onSelected: onMenuSelect },

        {
          target: this.button });


      }
    } }, { key: 'render', value: function render()

    {var _classNames,_this2 = this;var _props6 =








      this.props,noSubmit = _props6.noSubmit,loading = _props6.loading,type = _props6.type,size = _props6.size,children = _props6.children,className = _props6.className,rest = (0, _objectWithoutProperties3.default)(_props6, ['noSubmit', 'loading', 'type', 'size', 'children', 'className']);

      var classes = (0, _classnames2.default)((_classNames = {

        btn: true }, (0, _defineProperty3.default)(_classNames, 'btn-' +
      type, type), (0, _defineProperty3.default)(_classNames, 'btn--' +
      size, size), (0, _defineProperty3.default)(_classNames,
      'btn--loading', loading), _classNames),

      className);


      return (
        _react2.default.createElement('button', (0, _extends3.default)({},
          (0, _omit2.default)(rest, 'menuData'), {
            type: noSubmit ? 'button' : 'submit',
            className: classes,
            onClick: this.onClick,
            onMouseOver: this.onMouseOver,
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
            ref: function ref(c) {_this2.button = c;} }),

          loading && _react2.default.createElement('i', { className: 'icon icon-spinner icon--loading' }),
          _react2.default.createElement('span', null, children)));


    } }]);return Button;}(_react2.default.PureComponent);Button.displayName = 'Button';Button.defaultProps = ButtonProps;Button.propTypes = ButtonPropTypes;exports.default =


Button;module.exports = exports['default'];