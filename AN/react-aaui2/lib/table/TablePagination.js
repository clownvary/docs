'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _Pagination = require('../Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _utils = require('../shared/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TablePagination = function (_PureComponent) {
  (0, _inherits3.default)(TablePagination, _PureComponent);

  function TablePagination() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, TablePagination);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.handleClick = function (currentPage) {
      return function (e) {
        e.preventDefault();

        var onPaging = _this.props.onPaging;


        onPaging({ currentPage: currentPage });
      };
    }, _this.renderPaginationLinkElement = function (props) {
      var currentPage = parseInt(props.href.split('=')[1], 10);

      return _react2.default.createElement(
        'a',
        { onClick: _this.handleClick(currentPage) },
        props.children
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  TablePagination.prototype.render = function render() {
    var _props = this.props,
        totalPages = _props.totalPages,
        currentPage = _props.currentPage,
        style = _props.style,
        onPaging = _props.onPaging,
        rest = (0, _objectWithoutProperties3.default)(_props, ['totalPages', 'currentPage', 'style', 'onPaging']); // eslint-disable-line

    return _react2.default.createElement(
      'div',
      { style: style },
      !!totalPages && _react2.default.createElement(_Pagination2.default, (0, _extends3.default)({
        total: totalPages,
        current: currentPage,
        around: 4,
        linkElement: this.renderPaginationLinkElement
      }, rest))
    );
  };

  return TablePagination;
}(_react.PureComponent);

TablePagination.propTypes = {
  totalPages: _propTypes.number,
  currentPage: _propTypes.number,
  style: _propTypes.object, // eslint-disable-line
  onPaging: _propTypes.func
};
TablePagination.defaultProps = {
  totalPages: 0,
  currentPage: 0,
  style: {},
  onPaging: _utils.noop
};
exports.default = TablePagination;
module.exports = exports['default'];