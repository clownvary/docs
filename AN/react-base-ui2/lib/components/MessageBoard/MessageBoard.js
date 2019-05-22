'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _bind = require('lodash/bind');var _bind2 = _interopRequireDefault(_bind);
var _find = require('lodash/find');var _find2 = _interopRequireDefault(_find);
var _pull = require('lodash/pull');var _pull2 = _interopRequireDefault(_pull);
var _uniq = require('lodash/uniq');var _uniq2 = _interopRequireDefault(_uniq);
var _isString = require('lodash/isString');var _isString2 = _interopRequireDefault(_isString);
var _without = require('lodash/without');var _without2 = _interopRequireDefault(_without);
var _concat = require('lodash/concat');var _concat2 = _interopRequireDefault(_concat);
var _cloneDeep = require('lodash/cloneDeep');var _cloneDeep2 = _interopRequireDefault(_cloneDeep);
var _isEmpty = require('lodash/isEmpty');var _isEmpty2 = _interopRequireDefault(_isEmpty);
var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _MessagePad = require('./MessagePad');var _MessagePad2 = _interopRequireDefault(_MessagePad);
var _emitter = require('./emitter');var _emitter2 = _interopRequireDefault(_emitter);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var


MessageBoard = function (_Component) {(0, _inherits3.default)(MessageBoard, _Component);









  function MessageBoard(props) {(0, _classCallCheck3.default)(this, MessageBoard);var _this = (0, _possibleConstructorReturn3.default)(this, (MessageBoard.__proto__ || (0, _getPrototypeOf2.default)(MessageBoard)).call(this,
    props));

    _this.add = (0, _bind2.default)(_this.add, _this);
    _this.clear = (0, _bind2.default)(_this.clear, _this);
    _this.onClose = (0, _bind2.default)(_this.onClose, _this);

    _this.state = {
      groups: [] };return _this;

  }(0, _createClass3.default)(MessageBoard, [{ key: 'componentDidMount', value: function componentDidMount()

    {var _props$autoEnable =
      this.props.autoEnable,autoEnable = _props$autoEnable === undefined ? true : _props$autoEnable;
      if (autoEnable) {
        this.enable();
      }
    } }, { key: 'componentWillUnmount', value: function componentWillUnmount()

    {var _props$autoEnable2 =
      this.props.autoEnable,autoEnable = _props$autoEnable2 === undefined ? true : _props$autoEnable2;
      if (autoEnable) {
        this.disable();
      }
    } }, { key: 'onClose', value: function onClose(

    id) {
      /* istanbul ignore next */
      var groups = this.state.groups || [];
      groups = groups.filter(function (group) {return group.id !== id;});

      this.setState({
        groups: groups });

    } }, { key: 'enable', value: function enable()

    {
      /* istanbul ignore else */
      if (!_emitter2.default.isOn('add/notify', this.add)) {
        _emitter2.default.on('add/notify', this.add);
        _emitter2.default.on('clear/notify', this.clear);
      }
    } }, { key: 'disable', value: function disable()

    {
      _emitter2.default.off('add/notify', this.add);
      _emitter2.default.off('clear/notify', this.clear);
    } }, { key: '_add', value: function _add(

    message) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (options.dismissable) {
        message.dismissable = true;
      }

      var type = message.type;
      /* istanbul ignore next */
      var groups = (0, _cloneDeep2.default)(this.state.groups || []);
      var found = (0, _find2.default)(groups, function (g) {return g.type === type;});
      /* istanbul ignore else */
      if (!found) {
        groups.push(message);
      } else {
        if (!options.appendMode) {
          found.details = [];
        }
        found.details = (0, _concat2.default)(found.details, message.details);
        /* istanbul ignore else */
        if (options.noDuplicated) {
          found.details = (0, _uniq2.default)(found.details);
        }
      }

      this.setState({
        groups: groups });

    } }, { key: 'add', value: function add(

    message) {var _this2 = this;var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      setTimeout(function () {
        _this2._add(message, options);
      }, 0);
    } }, { key: '_clear', value: function _clear()

    {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';var details = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var groups = [];
      if (type) {
        /* istanbul ignore next */
        groups = (0, _cloneDeep2.default)(this.state.groups || []);
        var found = (0, _find2.default)(groups, function (g) {return g.type === type;});
        /* istanbul ignore else */
        if (found) {
          /* istanbul ignore if */
          if (!(0, _isEmpty2.default)(details)) {
            if ((0, _isString2.default)(details)) {
              details = [details];
            }
            found.details = _without2.default.apply(undefined, [found.details].concat((0, _toConsumableArray3.default)(details)));
          } else {
            found.details = [];
          }

          /* istanbul ignore else */
          if ((0, _isEmpty2.default)(found.details)) {
            groups = (0, _pull2.default)(groups, found);
          }
        }
      }

      this.setState({
        groups: groups });

    } }, { key: 'clear', value: function clear()

    {var _this3 = this;var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';var details = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      setTimeout(function () {
        _this3._clear(type, details);
      }, 0);
    } }, { key: 'renderMessage', value: function renderMessage(

    message) {
      return (
        _react2.default.createElement(_MessagePad2.default, {
          message: message,
          onClose: this.onClose }));


    } }, { key: 'render', value: function render()

    {var _this4 = this;
      var groups = this.state.groups;

      return (
        _react2.default.createElement('div', { className: (0, _classnames2.default)('message-board', this.props.className) },
          groups && groups.map(function (message) {return _this4.renderMessage(message);})));


    } }]);return MessageBoard;}(_react.Component);MessageBoard.displayName = 'MessageBoard';MessageBoard.propTypes = { autoEnable: _propTypes2.default.bool };MessageBoard.defaultProps = {};exports.default =


MessageBoard;module.exports = exports['default'];