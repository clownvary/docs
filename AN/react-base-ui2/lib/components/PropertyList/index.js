'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _isEmpty = require('lodash/isEmpty');var _isEmpty2 = _interopRequireDefault(_isEmpty);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _isString = require('lodash/isString');var _isString2 = _interopRequireDefault(_isString);
var _isArray = require('lodash/isArray');var _isArray2 = _interopRequireDefault(_isArray);
var _isNumber = require('lodash/isNumber');var _isNumber2 = _interopRequireDefault(_isNumber);
var _consts = require('../../consts');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                     * PropertyList
                                                                                                                                     * @name PropertyList
                                                                                                                                     *
                                                                                                                                     * @example
                                                                                                                                     *
                                                                                                                                     * const items = [
                                                                                                                                     *  {
                                                                                                                                     *    name: 'Company Name',
                                                                                                                                     *    value: 'companyName',
                                                                                                                                     *    className: 'item-class-test'
                                                                                                                                     *  },
                                                                                                                                     *  {
                                                                                                                                     *    name: 'Customer Type',
                                                                                                                                     *    value: 'customerType',
                                                                                                                                     *    onRenderValue: item => (<span>{item.value || '-'}</span>)
                                                                                                                                     *  },
                                                                                                                                     * {
                                                                                                                                     *     name: 'Company Address',
                                                                                                                                     *     value: 'companyAddress'
                                                                                                                                     *   },
                                                                                                                                     *   { name: 'Profession', value: 'profession' },
                                                                                                                                     *   { name: 'Phone', value: 'phone' },
                                                                                                                                     *   { name: 'Address', value: '', showNullName: true }
                                                                                                                                     * ];
                                                                                                                                     * ]
                                                                                                                                     *
                                                                                                                                     * <PropertyList showColon items={items} />
                                                                                                                                     */

/**
                                                                                                                                        * @desc Props for PropertyList
                                                                                                                                        * @name PropertyList Props
                                                                                                                                        * @const
                                                                                                                                        */

var propTypes = {
  /**
                   * @type {String}
                   * @desc Specified class name for the PropertyList.
                   */
  className: _propTypes2.default.string,
  /**
                                          * @type {String}
                                          * @desc Determines the skin prefix of PropertyList.
                                          */
  prefix: _propTypes2.default.string,
  /**
                                       * @type {Boolean}
                                       * @desc whether to display : after label text
                                       */

  showColon: _propTypes2.default.bool,

  /**
                                        * @type {Array}
                                        * @desc Determines the data of list. It's element is an object, a total of these attributes:
                                        *
                                        * @property {String|Number|Element} name label name
                                        * @property {String|Number|Element|Array} value label value
                                        * @property {String} className Specify item specified class name
                                        * @property {Boolean} showNullName When the item value is empty, the control name is displayed
                                        * @property {Function} onRenderValue Function to customize the cell value
                                        * @property {Function} onRenderName Function to customize the cell name
                                        */
  items: _propTypes2.default.arrayOf(
  _propTypes2.default.shape({
    name: _propTypes2.default.oneOfType([
    _propTypes2.default.number,
    _propTypes2.default.string,
    _propTypes2.default.element]),

    value: _propTypes2.default.oneOfType([
    _propTypes2.default.number,
    _propTypes2.default.string,
    _propTypes2.default.array,
    _propTypes2.default.element]),

    className: _propTypes2.default.string,
    onRenderValue: _propTypes2.default.func,
    onRenderName: _propTypes2.default.func })).

  isRequired };


/**
                 * UI Component PropertyList
                 * */var
PropertyList = function (_React$PureComponent) {(0, _inherits3.default)(PropertyList, _React$PureComponent);function PropertyList() {(0, _classCallCheck3.default)(this, PropertyList);return (0, _possibleConstructorReturn3.default)(this, (PropertyList.__proto__ || (0, _getPrototypeOf2.default)(PropertyList)).apply(this, arguments));}(0, _createClass3.default)(PropertyList, [{ key: 'renderName', value: function renderName(































    item) {var
      showColon = this.props.showColon;var
      onRenderName = item.onRenderName;
      var name = void 0;
      if (showColon && (0, _isString2.default)(item.name)) {
        name = item.name + ':';
      } else {
        name = item.name;
      }

      if ((0, _isFunction2.default)(onRenderName)) {
        name = onRenderName(item);
      }

      if (name) {
        return _react2.default.createElement('span', null, name);
      }

      return null;
    } }, { key: 'render', value: function render()

    {var _this2 = this;var _props =
      this.props,items = _props.items,prefix = _props.prefix,className = _props.className;
      var listClassName = prefix + '-property-list';

      var propertyListCls = (0, _classnames2.default)(listClassName, className);

      return (
        _react2.default.createElement('div', { className: propertyListCls },

          items.map(function (item, index) {var
            onRenderValue = item.onRenderValue;var
            value = item.value;

            if ((0, _isFunction2.default)(onRenderValue)) {
              value = onRenderValue(item);
            }

            if (!(0, _isEmpty2.default)(value) || (0, _isNumber2.default)(value) || item.showNullName) {
              return (
                _react2.default.createElement('div', { key: index, className: (0, _classnames2.default)(listClassName + '__item', item.className) },
                  _this2.renderName(item),

                  PropertyList.renderValue(value)));



            }
            return null;
          })));



    } }], [{ key: 'renderValue', value: function renderValue(itemValue) {var value = itemValue;if ((0, _isArray2.default)(value)) {value = _react2.default.createElement('div', { className: 'an-property-list__item__list' }, value.map(function (chlidnValue, index) {return _react2.default.createElement('span', { key: index }, chlidnValue);}));}if (value) {return _react2.default.createElement('span', null, value);}return null;} }]);return PropertyList;}(_react2.default.PureComponent);PropertyList.propTypes = propTypes;PropertyList.defaultProps = { prefix: '' + _consts.DefaultCSSPrefix, showColon: false, items: [] };exports.default = PropertyList;module.exports = exports['default'];