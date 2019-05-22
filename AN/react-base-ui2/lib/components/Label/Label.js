'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _defineProperty2 = require('babel-runtime/helpers/defineProperty');var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _propTypes = require('prop-types');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/** Default PropTypes of Label.
                                                                                                                                      * @memberof Label
                                                                                                                                     */
var LabelPropTypes = {
  /**
                        * A list of class names to pass along to the container element of component.
                        * @property {String}
                        */
  className: _propTypes.string,
  /**
                                 * Type of Label styles, options:`success`, `warning`, `danger`, `info`
                                 * @property {String}
                                 */
  type: (0, _propTypes.oneOf)(['success', 'warning', 'danger', 'info']).isRequired,
  /** Child Node
                                                                                     * @type {node}
                                                                                    */
  children: _propTypes.node };


/** Default Props for Label */
var LabelProps = {
  type: 'info' };


/** UI component that displays Label with variant settings.*/var
Label = function (_PureComponent) {(0, _inherits3.default)(Label, _PureComponent);function Label() {(0, _classCallCheck3.default)(this, Label);return (0, _possibleConstructorReturn3.default)(this, (Label.__proto__ || (0, _getPrototypeOf2.default)(Label)).apply(this, arguments));}(0, _createClass3.default)(Label, [{ key: 'render', value: function render()




    {var _props =
      this.props,className = _props.className,type = _props.type,children = _props.children,rest = (0, _objectWithoutProperties3.default)(_props, ['className', 'type', 'children']);
      var classes = (0, _classnames2.default)((0, _defineProperty3.default)({

        label: true }, 'label-' +
      type, true),

      className);


      return (
        _react2.default.createElement('span', (0, _extends3.default)({}, rest, { className: classes }),
          children));


    } }]);return Label;}(_react.PureComponent);Label.displayName = 'Label';Label.propTypes = LabelPropTypes;Label.defaultProps = LabelProps;exports.default =


Label;module.exports = exports['default'];