import _extends from 'babel-runtime/helpers/extends';
import _Promise from 'babel-runtime/core-js/promise';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';

var _L10nProvider$childCo;

import { PureComponent, Children } from 'react';
import { string, object, node } from 'prop-types';
import L10n from './L10n';
import { aauiL10nShape } from './types';

var l10nName = 'aauiL10n';

var L10nProvider = function (_PureComponent) {
  _inherits(L10nProvider, _PureComponent);

  function L10nProvider(props, context) {
    _classCallCheck(this, L10nProvider);

    var _this = _possibleConstructorReturn(this, _PureComponent.call(this, props, context));

    _this.state = { messages: props.messages || {} };
    _this.l10n = props.l10n || new L10n(props, context);
    return _this;
  }

  L10nProvider.prototype.getChildContext = function getChildContext() {
    var _ref;

    return _ref = {}, _ref[l10nName] = this.l10n, _ref;
  };

  L10nProvider.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var modules = [import( /* webpackChunkName: "AUI/L10n/[request]" */
    '../../i18n/' + this.props.locale + '.json')];

    if (this.props.messagePath) {
      var messageLocalPath = '' + this.props.messagePath.replace('{locale}', this.props.locale);
      modules.push(import('' + messageLocalPath));
    }

    _Promise.all(modules).then(function (messages) {
      _this2.syncMessages(_extends({}, messages[0], messages[1]));
    });
  };

  L10nProvider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this3 = this;

    if (this.props.locale !== nextProps.locale) {
      this.l10n.locale = nextProps.locale;

      var modules = [import( /* webpackChunkName: "AUI/L10n/[request]" */
      '../../i18n/' + this.l10n.locale + '.json')];

      if (nextProps.messagePath) {
        var messageLocalPath = '' + nextProps.messagePath.replace('{locale}', this.l10n.locale);
        modules.push(import('' + messageLocalPath));
      }

      _Promise.all(modules).then(function (messages) {
        _this3.syncMessages(_extends({}, messages[0], messages[1]));
      });
    }

    if (this.props.messages !== nextProps.messages) {
      this.syncMessages(nextProps.messages);
    }
  };

  L10nProvider.prototype.syncMessages = function syncMessages(messages) {
    this.l10n.messages = _extends({}, this.l10n.messages, messages);

    this.setState({
      messages: this.l10n.messages
    });
  };

  L10nProvider.prototype.render = function render() {
    return Children.only(this.props.children);
  };

  return L10nProvider;
}(PureComponent);

L10nProvider.propTypes = {
  locale: string,
  messages: object, // eslint-disable-line
  l10n: object, // eslint-disable-line
  messagePath: string, // eslint-disable-line
  children: node
};
L10nProvider.defaultProps = {
  locale: 'en_US'
};
L10nProvider.childContextTypes = (_L10nProvider$childCo = {}, _L10nProvider$childCo[l10nName] = aauiL10nShape, _L10nProvider$childCo);
export default L10nProvider;