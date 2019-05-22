import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _Object$keys from 'babel-runtime/core-js/object/keys';
import React, { PureComponent } from 'react';

import L10n from './L10n';
import getDisplayName from './getDisplayName';
import { aauiL10nConfigPropTypes, aauiL10nFuncPropTypes, aauiL10nShape } from './types';
import { omit } from './utils';

var staticL10n = new L10n();

export default function injectL10n() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var aauiL10nConfigPropKeys = _Object$keys(aauiL10nConfigPropTypes);
  var aauiL10nFuncPropKeys = _Object$keys(aauiL10nFuncPropTypes);

  var aauiL10nName = 'aauiL10n';
  var _options$l10nName = options.l10nName,
      l10nName = _options$l10nName === undefined ? 'l10n' : _options$l10nName;


  return function wrapWithInjectL10n(WrappedComponent) {
    var InjectL10n = function (_PureComponent) {
      _inherits(InjectL10n, _PureComponent);

      function InjectL10n(props) {
        _classCallCheck(this, InjectL10n);

        var _this = _possibleConstructorReturn(this, _PureComponent.call(this, props));

        _this.getBoundL10n = function () {
          var _ref;

          var l10n = _this.context[aauiL10nName] || staticL10n;
          var boundFuncs = aauiL10nFuncPropKeys.reduce(function (funcs, name) {
            var _extends2;

            return _extends({}, funcs, (_extends2 = {}, _extends2[name] = l10n[name].bind(l10n), _extends2));
          }, {});
          var boundConfig = aauiL10nConfigPropKeys.reduce(function (config, name) {
            var _extends3;

            return _extends({}, config, (_extends3 = {}, _extends3[name] = l10n[name], _extends3));
          }, {});

          return _ref = {}, _ref[l10nName] = _extends({}, l10n, boundConfig, boundFuncs), _ref;
        };

        _this.unsubscribe = null;
        return _this;
      }

      InjectL10n.prototype.componentDidMount = function componentDidMount() {
        var _this2 = this;

        if (this.context[aauiL10nName]) {
          this.unsubscribe = this.context[aauiL10nName].subscribe(function () {
            return _this2.forceUpdate();
          });
        }
      };

      InjectL10n.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.unsubscribe) {
          this.unsubscribe();
        }

        this.unsubscribe = null;
      };

      InjectL10n.prototype.render = function render() {
        var finalProps = omit(this.props, [aauiL10nName]);

        return React.createElement(WrappedComponent, _extends({}, finalProps, this.getBoundL10n()));
      };

      return InjectL10n;
    }(PureComponent);

    InjectL10n.displayName = 'InjectL10n(' + getDisplayName(WrappedComponent) + ')';
    InjectL10n.contextTypes = { aauiL10n: aauiL10nShape };


    return InjectL10n;
  };
}