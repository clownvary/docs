'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _TableHead = require('./TableHead');

var _TableHead2 = _interopRequireDefault(_TableHead);

var _TableRow = require('./TableRow');

var _TableRow2 = _interopRequireDefault(_TableRow);

var _TablePagination = require('./TablePagination');

var _TablePagination2 = _interopRequireDefault(_TablePagination);

var _utils = require('../shared/utils');

require('./Table.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Table = function (_PureComponent) {
  (0, _inherits3.default)(Table, _PureComponent);

  function Table() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Table);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.handleHeadSelect = function () {
      var _this$props = _this.props,
          selected = _this$props.selected,
          dataSource = _this$props.dataSource,
          onSelect = _this$props.onSelect;

      // If all is selected then clean all selections => []
      // If not all is selected then select all directly => [0, 1, 2 , ..., dataSource.length-1]

      var selections = selected.length === dataSource.length ? [] : dataSource.map(function (d, index) {
        return index;
      });

      onSelect(selections);
    }, _this.handleSelect = function (index) {
      return function () {
        var _this$props2 = _this.props,
            multiSelectable = _this$props2.multiSelectable,
            selected = _this$props2.selected,
            onSelect = _this$props2.onSelect;

        var selections = [index];

        if (multiSelectable) {
          // Remove it if found in `selected`
          if (selected.indexOf(index) !== -1) {
            selections = selected.filter(function (p) {
              return p !== index;
            });
          } else {
            selections = selected.concat(index);
          }
        }

        onSelect(selections);
      };
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  Table.prototype.renderTableHead = function renderTableHead() {
    var hideTableHead = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var _props = this.props,
        selectable = _props.selectable,
        multiSelectable = _props.multiSelectable,
        selected = _props.selected,
        cols = _props.cols,
        dataSource = _props.dataSource,
        sortBy = _props.sortBy;

    var className = hideTableHead ? 'table__hidden-header' : '';

    return _react2.default.createElement(_TableHead2.default, {
      className: className,
      selectable: selectable,
      multiSelectable: multiSelectable,
      selected: selected.length === dataSource.length,
      cols: cols,
      sortBy: sortBy,
      onSelect: this.handleHeadSelect,
      onSort: this.props.onSort
    });
  };

  Table.prototype.renderTableBody = function renderTableBody() {
    var _this2 = this;

    var _props2 = this.props,
        selectable = _props2.selectable,
        selected = _props2.selected,
        cols = _props2.cols,
        dataSource = _props2.dataSource;


    return _react2.default.createElement(
      'tbody',
      null,
      dataSource.map(function (d, index) {
        return _react2.default.createElement(_TableRow2.default, {
          key: index,
          selectable: selectable,
          selected: selected.indexOf(index) !== -1,
          data: d,
          cols: cols,
          onSelect: _this2.handleSelect(index)
        });
      })
    );
  };

  Table.prototype.render = function render() {
    var _classNames;

    var _props3 = this.props,
        className = _props3.className,
        height = _props3.height,
        pagination = _props3.pagination,
        onPaging = _props3.onPaging,
        textOverflow = _props3.textOverflow;


    var tableClasses = (0, _classnames2.default)('table', 'table--fixed', (_classNames = {}, _classNames['table--' + textOverflow] = textOverflow, _classNames), className);

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: 'table-container--fixed' },
        _react2.default.createElement(
          'table',
          { className: tableClasses },
          this.renderTableHead(),
          _react2.default.createElement('tbody', null)
        )
      ),
      _react2.default.createElement(
        'div',
        {
          className: 'table-container',
          style: { height: height !== false ? height : null }
        },
        _react2.default.createElement(
          'table',
          { className: tableClasses },
          this.renderTableHead(true),
          this.renderTableBody()
        )
      ),
      _react2.default.createElement(_TablePagination2.default, (0, _extends3.default)({}, pagination, { onPaging: onPaging }))
    );
  };

  return Table;
}(_react.PureComponent);

Table.propTypes = {
  className: _propTypes.string,
  selectable: _propTypes.bool,
  multiSelectable: _propTypes.bool,
  dataSource: _propTypes.array, // eslint-disable-line
  selected: _propTypes.array, // eslint-disable-line
  cols: _propTypes.object, // eslint-disable-line
  height: (0, _propTypes.oneOfType)([_propTypes.bool, _propTypes.string]),
  sortBy: _propTypes.string,
  pagination: _propTypes.object, // eslint-disable-line
  onSelect: _propTypes.func,
  onSort: _propTypes.func,
  onPaging: _propTypes.func,
  textOverflow: (0, _propTypes.oneOf)(['ellipsis', 'hyphenate'])
};
Table.defaultProps = {
  className: '',
  selectable: true,
  multiSelectable: true,
  dataSource: [],
  selected: [],
  cols: {},
  height: false,
  sortBy: '',
  pagination: null,
  onSelect: _utils.noop,
  onSort: _utils.noop,
  onPaging: _utils.noop,
  textOverflow: 'ellipsis'
};
exports.default = Table;
module.exports = exports['default'];