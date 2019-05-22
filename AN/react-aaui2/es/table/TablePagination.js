import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import { number, object, func } from 'prop-types';

import Pagination from '../Pagination';
import { noop } from '../shared/utils';

var TablePagination = function (_PureComponent) {
  _inherits(TablePagination, _PureComponent);

  function TablePagination() {
    var _temp, _this, _ret;

    _classCallCheck(this, TablePagination);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.handleClick = function (currentPage) {
      return function (e) {
        e.preventDefault();

        var onPaging = _this.props.onPaging;


        onPaging({ currentPage: currentPage });
      };
    }, _this.renderPaginationLinkElement = function (props) {
      var currentPage = parseInt(props.href.split('=')[1], 10);

      return React.createElement(
        'a',
        { onClick: _this.handleClick(currentPage) },
        props.children
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  TablePagination.prototype.render = function render() {
    var _props = this.props,
        totalPages = _props.totalPages,
        currentPage = _props.currentPage,
        style = _props.style,
        onPaging = _props.onPaging,
        rest = _objectWithoutProperties(_props, ['totalPages', 'currentPage', 'style', 'onPaging']); // eslint-disable-line

    return React.createElement(
      'div',
      { style: style },
      !!totalPages && React.createElement(Pagination, _extends({
        total: totalPages,
        current: currentPage,
        around: 4,
        linkElement: this.renderPaginationLinkElement
      }, rest))
    );
  };

  return TablePagination;
}(PureComponent);

TablePagination.propTypes = {
  totalPages: number,
  currentPage: number,
  style: object, // eslint-disable-line
  onPaging: func
};
TablePagination.defaultProps = {
  totalPages: 0,
  currentPage: 0,
  style: {},
  onPaging: noop
};
export default TablePagination;