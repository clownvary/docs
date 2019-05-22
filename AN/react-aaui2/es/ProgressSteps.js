import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import { string, object, array } from 'prop-types';
import classNames from 'classnames';

import * as da from './shared/data-access';

var ProgressSteps = function (_PureComponent) {
  _inherits(ProgressSteps, _PureComponent);

  function ProgressSteps() {
    _classCallCheck(this, ProgressSteps);

    return _possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
  }

  ProgressSteps.prototype.render = function render() {
    var _classNames;

    var _props = this.props,
        className = _props.className,
        style = _props.style,
        size = _props.size,
        steps = _props.steps;

    var classes = classNames((_classNames = {
      'progress-steps': true
    }, _classNames['progress-steps--' + size] = size, _classNames), className);

    return React.createElement(
      'ul',
      { className: classes, style: style },
      steps.map(function (step) {
        return React.createElement(
          'li',
          {
            key: da.get(step, 'text'),
            className: 'progress-steps__step ' + da.get(step, 'status')
          },
          React.createElement(
            'span',
            { className: 'progress-steps__step-text' },
            da.get(step, 'text')
          )
        );
      })
    );
  };

  return ProgressSteps;
}(PureComponent);

ProgressSteps.displayName = 'AAUIProgressSteps';
ProgressSteps.propTypes = {
  className: string,
  size: string,
  steps: array, // eslint-disable-line
  style: object // eslint-disable-line
};
export default ProgressSteps;