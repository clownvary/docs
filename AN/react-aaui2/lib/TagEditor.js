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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./shared/utils');

var _Tag = require('./Tag');

var _Tag2 = _interopRequireDefault(_Tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lastFocusedElement = null;

function trackLastFocusedElement() {
  lastFocusedElement = document.activeElement;
}

function stopPropagation(e) {
  e.stopPropagation();
}

var TagEditor = function (_PureComponent) {
  (0, _inherits3.default)(TagEditor, _PureComponent);

  function TagEditor() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, TagEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.setTagRef = function (tag) {
      _this.tag = tag;
    }, _this.handleClick = function () {
      if (lastFocusedElement && lastFocusedElement.tagName === 'INPUT') return;

      var d = _this.props.data;
      var data = d.concat({ text: 'your tag name', isNew: true });

      _this.props.onChange(data);
    }, _this.handleTagClose = function (ind) {
      return function () {
        var d = _this.props.data;
        var data = d.filter(function (item, index) {
          return index !== ind;
        });

        _this.props.onChange(data);
      };
    }, _this.handleTagChange = function (ind) {
      return function (text, isKeyFinished) {
        var data = _this.props.data;

        if (text === '') {
          data = data.filter(function (item, index) {
            return index !== ind;
          });
        } else {
          data = data.map(function (item, index) {
            if (index === ind) {
              return { text: text };
            }

            return item;
          });

          // If we the `keyCode` is `TAB` or `ENTER`, then add another new Tag
          if (isKeyFinished && ind === data.length - 1) {
            data = data.concat({ text: 'your tag name', isNew: true });
          }
        }

        _this.props.onChange(data);
      };
    }, _this.handleTabCancel = function (ind) {
      return function () {
        var data = _this.props.data;

        // Remove tag it it's new

        if (data[ind].isNew) {
          _this.props.onChange(data.filter(function (item, index) {
            return index !== ind;
          }));
        }
      };
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  TagEditor.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    var lastTag = this.tag;

    this.props.data.length > prevProps.data.length && lastTag && lastTag.toInput();
  };

  TagEditor.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        errored = _props.errored,
        editMode = _props.editMode,
        className = _props.className,
        placeholder = _props.placeholder,
        data = _props.data,
        rest = (0, _objectWithoutProperties3.default)(_props, ['errored', 'editMode', 'className', 'placeholder', 'data']);

    var classes = (0, _classnames2.default)({
      tageditor: true,
      'is-errored': errored
    }, className);

    return _react2.default.createElement(
      'div',
      (0, _extends3.default)({
        className: classes
      }, (0, _utils.omit)(rest, ['onChange']), {
        onMouseDown: trackLastFocusedElement,
        onClick: editMode ? this.handleClick : _utils.noop
      }),
      data.map(function (_ref, i) {
        var text = _ref.text,
            isNew = _ref.isNew,
            tagRestProps = (0, _objectWithoutProperties3.default)(_ref, ['text', 'isNew']);
        return _react2.default.createElement(_Tag2.default, (0, _extends3.default)({
          key: i,
          ref: _this2.setTagRef,
          value: text,
          isNew: !!isNew,
          editMode: editMode,
          onChange: _this2.handleTagChange(i),
          onCancel: _this2.handleTabCancel(i),
          onClose: _this2.handleTagClose(i),
          onClick: stopPropagation
        }, tagRestProps));
      }),
      !data.length && placeholder
    );
  };

  return TagEditor;
}(_react.PureComponent);

TagEditor.displayName = 'AUITagEditor';
TagEditor.propTypes = {
  errored: _propTypes.bool,
  editMode: _propTypes.bool,
  className: _propTypes.string,
  onChange: _propTypes.func,

  placeholder: _propTypes.node,
  data: (0, _propTypes.oneOfType)([_propTypes.array, _propTypes.object]).isRequired
};
TagEditor.defaultProps = {
  errored: false,
  editMode: true,
  onChange: _utils.noop,
  data: []
};
exports.default = TagEditor;
module.exports = exports['default'];