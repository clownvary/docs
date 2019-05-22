import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

var string = PropTypes.string,
    func = PropTypes.func;

var propTypes = {
  className: string,
  value: string,
  onChange: func
};
var defaultProps = {
  className: 'input'
};

var TextArea = function (_PureComponent) {
  _inherits(TextArea, _PureComponent);

  function TextArea(props) {
    _classCallCheck(this, TextArea);

    var _this = _possibleConstructorReturn(this, _PureComponent.call(this, props));

    _this.handleChange = function (e) {
      e.persist();

      _this.setState({
        value: e.target.value
      }, function () {
        if (_this.props.onChange) {
          _this.props.onChange(e);
        }
      });
    };

    _this.state = {
      value: props.value
    };
    return _this;
  }

  TextArea.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value
      });
    }
  };

  TextArea.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        rest = _objectWithoutProperties(_props, ['className']);

    return React.createElement('textarea', _extends({}, rest, {
      className: className,
      value: this.state.value,
      onChange: this.handleChange
    }));
  };

  return TextArea;
}(PureComponent);

export default TextArea;


TextArea.displayName = 'AAUITextArea';
TextArea.propTypes = propTypes;
TextArea.defaultProps = defaultProps;