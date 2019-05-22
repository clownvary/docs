'use strict';

exports.__esModule = true;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _TableCell = require('./TableCell');

var _TableCell2 = _interopRequireDefault(_TableCell);

var _Checkbox = require('../Checkbox/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _utils = require('../shared/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableHead = function (_PureComponent) {
  (0, _inherits3.default)(TableHead, _PureComponent);

  function TableHead() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, TableHead);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.handleSort = function (colName) {
      return function () {
        var _this$props = _this.props,
            onSort = _this$props.onSort,
            cols = _this$props.cols;
        var sorted = cols[colName].sorted;


        if (sorted !== false) {
          onSort({
            column: colName,
            order: sorted !== 'ASC' ? 'ASC' : 'DESC'
          });
        }
      };
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  TableHead.prototype.renderTableHeadCells = function renderTableHeadCells() {
    var _this2 = this;

    var _props = this.props,
        sortBy = _props.sortBy,
        cols = _props.cols;


    return (0, _keys2.default)(cols).map(function (colName) {
      var col = cols[colName];
      var sorted = col.sorted;

      var canSortForColumn = sortBy === colName && sorted !== false;
      var sortIconClassName = void 0;

      // Only one column was allowed to be sorted
      if (canSortForColumn) {
        sortIconClassName = 'sort-icon';

        if (sorted === 'ASC') {
          sortIconClassName += ' sort-up';
        } else {
          sortIconClassName += ' sort-down';
        }
      }

      return _react2.default.createElement(
        _TableCell2.default,
        {
          key: colName,
          className: sortIconClassName,
          tagName: 'th',
          onClick: _this2.handleSort(colName),
          style: col.style
        },
        colName
      );
    });
  };

  TableHead.prototype.render = function render() {
    var _props2 = this.props,
        selectable = _props2.selectable,
        multiSelectable = _props2.multiSelectable,
        selected = _props2.selected,
        onSelect = _props2.onSelect,
        onSort = _props2.onSort,
        sortBy = _props2.sortBy,
        cols = _props2.cols,
        rest = (0, _objectWithoutProperties3.default)(_props2, ['selectable', 'multiSelectable', 'selected', 'onSelect', 'onSort', 'sortBy', 'cols']);

    var checkboxTableCell = void 0;

    if (selectable) {
      if (multiSelectable) {
        checkboxTableCell = _react2.default.createElement(
          'th',
          null,
          _react2.default.createElement(_Checkbox2.default, { onChange: onSelect, checked: selected })
        );
      } else {
        checkboxTableCell = _react2.default.createElement('th', null);
      }
    }

    return _react2.default.createElement(
      'thead',
      rest,
      _react2.default.createElement(
        'tr',
        null,
        checkboxTableCell,
        this.renderTableHeadCells()
      )
    );
  };

  return TableHead;
}(_react.PureComponent);

TableHead.propTypes = {
  selected: _propTypes.bool,
  selectable: _propTypes.bool,
  multiSelectable: _propTypes.bool,
  cols: _propTypes.object, // eslint-disable-line
  sortBy: _propTypes.string,
  onSelect: _propTypes.func,
  onSort: _propTypes.func
};
TableHead.defaultProps = {
  selected: false,
  selectable: true,
  multiSelectable: true,
  cols: {},
  sortBy: '',
  onSelect: _utils.noop,
  onSort: _utils.noop
};
exports.default = TableHead;
module.exports = exports['default'];