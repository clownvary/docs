import _Object$keys from 'babel-runtime/core-js/object/keys';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import { bool, node, oneOf, object } from 'prop-types';
import MediaQuery from 'react-responsive';

var VIEWPORTS = {
  smAndAbove: { minWidth: '768px' },
  mdAndAbove: { minWidth: '992px' },
  lgAndAbove: { minWidth: '1200px' }
};

var Viewport = function (_PureComponent) {
  _inherits(Viewport, _PureComponent);

  function Viewport() {
    _classCallCheck(this, Viewport);

    return _possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
  }

  Viewport.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        not = _props.not,
        smAndAbove = _props.smAndAbove,
        mdAndAbove = _props.mdAndAbove,
        lgAndAbove = _props.lgAndAbove,
        type = _props.type,
        viewports = _props.viewports; // eslint-disable-line

    var finalViewports = _extends({}, VIEWPORTS, viewports);
    var mediaQuery = _Object$keys(finalViewports).reduce(function (mq, v) {
      var viewport = _this2.props[v];

      return viewport ? (not ? 'not ' + type + ' and' : '') + ' (min-width: ' + finalViewports[v].minWidth + ')' : mq;
    }, '') || '()';

    return React.createElement(
      MediaQuery,
      { query: mediaQuery },
      this.props.children
    );
  };

  return Viewport;
}(PureComponent);

Viewport.propTypes = {
  smAndAbove: bool,
  mdAndAbove: bool,
  lgAndAbove: bool,
  not: bool,
  type: oneOf(['all', 'screen', 'print']),
  children: node,
  viewports: object // eslint-disable-line
};
Viewport.defaultProps = {
  smAndAbove: false,
  mdAndAbove: false,
  lgAndAbove: false,
  not: false,
  type: 'screen',
  viewports: {}
};
export default Viewport;