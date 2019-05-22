import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import { bool, string, array, object, func, node, oneOfType } from 'prop-types';
import classNames from 'classnames';

import { omit, noop } from './shared/utils';
import Tag from './Tag';

var lastFocusedElement = null;

function trackLastFocusedElement() {
  lastFocusedElement = document.activeElement;
}

function stopPropagation(e) {
  e.stopPropagation();
}

var TagEditor = function (_PureComponent) {
  _inherits(TagEditor, _PureComponent);

  function TagEditor() {
    var _temp, _this, _ret;

    _classCallCheck(this, TagEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.setTagRef = function (tag) {
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
    }, _temp), _possibleConstructorReturn(_this, _ret);
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
        rest = _objectWithoutProperties(_props, ['errored', 'editMode', 'className', 'placeholder', 'data']);

    var classes = classNames({
      tageditor: true,
      'is-errored': errored
    }, className);

    return React.createElement(
      'div',
      _extends({
        className: classes
      }, omit(rest, ['onChange']), {
        onMouseDown: trackLastFocusedElement,
        onClick: editMode ? this.handleClick : noop
      }),
      data.map(function (_ref, i) {
        var text = _ref.text,
            isNew = _ref.isNew,
            tagRestProps = _objectWithoutProperties(_ref, ['text', 'isNew']);

        return React.createElement(Tag, _extends({
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
}(PureComponent);

TagEditor.displayName = 'AUITagEditor';
TagEditor.propTypes = {
  errored: bool,
  editMode: bool,
  className: string,
  onChange: func,

  placeholder: node,
  data: oneOfType([array, object]).isRequired
};
TagEditor.defaultProps = {
  errored: false,
  editMode: true,
  onChange: noop,
  data: []
};
export default TagEditor;