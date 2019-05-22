'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);var _defineProperty2 = require('babel-runtime/helpers/defineProperty');var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _consts = require('../../consts');
var _consts2 = require('./consts');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var TagPropTypes = {
  prefixCls: _propTypes2.default.string,
  /**
                                          * class names which were applied to component container div.
                                          */
  className: _propTypes2.default.string,
  /**
                                          * determine the tag size.
                                          */
  size: _propTypes2.default.oneOf([_consts2.TagSize.SMALL, _consts2.TagSize.MEDIUM, _consts2.TagSize.LARGE, _consts2.TagSize.EXTRA_LARGE]),
  /**
                                                                                                                                             * determine the type of tag, including background-color and color.
                                                                                                                                             */
  type: _propTypes2.default.oneOf([_consts2.TagType.DEFAULT, _consts2.TagType.PENDING, _consts2.TagType.ERROR]),
  /**
                                                                                                                  * determine the close icon renders of tag.
                                                                                                                  */
  closable: _propTypes2.default.bool,
  /**
                                       * the callback function which is triggered when clicking the close icon.
                                       */
  onClose: _propTypes2.default.func };


var TagDefaultProps = {
  prefixCls: _consts.DefaultCSSPrefix + '-tag',
  size: _consts2.TagSize.MEDIUM,
  type: _consts2.TagType.DEFAULT };var


Tag = function (_Component) {(0, _inherits3.default)(Tag, _Component);function Tag() {var _ref;var _temp, _this, _ret;(0, _classCallCheck3.default)(this, Tag);for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Tag.__proto__ || (0, _getPrototypeOf2.default)(Tag)).call.apply(_ref, [this].concat(args))), _this), _this.



    handleCloseIconClick = function (e) {var
      onClose = _this.props.onClose;
      onClose && onClose(e);
    }, _this.

    renderCloseIcon = function () {var
      closable = _this.props.closable;
      if (closable) {
        return _react2.default.createElement('i', { className: 'icon icon-close', onMouseDown: _this.handleCloseIconClick });
      }
      return null;
    }, _this.

    getTagClassName = function () {var _this$props =
      _this.props,prefixCls = _this$props.prefixCls,className = _this$props.className,type = _this$props.type,size = _this$props.size,closable = _this$props.closable;
      return (0, _classnames2.default)(prefixCls, prefixCls + '__' + type, prefixCls + '__size-' + size, className, (0, _defineProperty3.default)({},
      prefixCls + '__closable', closable));

    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);}(0, _createClass3.default)(Tag, [{ key: 'render', value: function render()

    {var _props =
      this.props,children = _props.children,rest = (0, _objectWithoutProperties3.default)(_props, ['children']);
      var tagClassName = this.getTagClassName();
      var closeIconNode = this.renderCloseIcon();
      return (
        _react2.default.createElement('div', (0, _extends3.default)({}, rest, { className: tagClassName }),
          children,
          closeIconNode));


    } }]);return Tag;}(_react.Component);Tag.propTypes = TagPropTypes;Tag.defaultProps = TagDefaultProps;exports.default =


Tag;module.exports = exports['default'];