'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _promise = require('babel-runtime/core-js/promise');var _promise2 = _interopRequireDefault(_promise);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _propTypes = require('prop-types');





var _activenetPciIframe = require('activenet-pci-iframe/lib/activenet-pci-iframe');var _activenetPciIframe2 = _interopRequireDefault(_activenetPciIframe);
var _v = require('uuid/v4');var _v2 = _interopRequireDefault(_v);

var _AlertBar = require('../Alert/AlertBar');var _AlertBar2 = _interopRequireDefault(_AlertBar);
var _dialog = require('../../services/dialog');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/** Default PropTypes of Phone.
                                                                                                                                              * @memberof Phone
                                                                                                                                             */
var PCIIframePropTypes = {

  /** if debug === true, will render more debug information in console.
                            * @type {bool}
                           */
  debug: _propTypes.bool,
  /** the caller source. ex.  an-servlet, an-aui, an-cui ....
                           * @type {string}
                          */
  source: _propTypes.string.required,

  /** need return payment iframe url.
                                       * @type {func}
                                      */
  getPCICheckoutIframeUrl: _propTypes.func.required,
  getPCICheckoutPaymentInfoBySessionId: _propTypes.func.required };


/** Default Props for Calendar */
var IframeProps = {
  source: 'an-aui',
  debug: false };var



PCIIframe = function (_PureComponent) {(0, _inherits3.default)(PCIIframe, _PureComponent);




  function PCIIframe() {(0, _classCallCheck3.default)(this, PCIIframe);var _this = (0, _possibleConstructorReturn3.default)(this, (PCIIframe.__proto__ || (0, _getPrototypeOf2.default)(PCIIframe)).call(this));_this.






    componentDidMount = function () {
      _this.instance = new _activenetPciIframe2.default({
        debug: !!_this.props.debug,
        source: _this.props.source,
        container: '#' + _this.divIframeId,
        api: {
          getPCICheckoutIframeUrl: _this.props.getPCICheckoutIframeUrl,
          getPCICheckoutPaymentInfoBySessionId: _this.props.getPCICheckoutPaymentInfoBySessionId } });


      _this.showIframePromise();

      if ((0, _isFunction2.default)(_this.props.getInstance)) {
        _this.props.getInstance({
          showIframePromise: function showIframePromise() {return _this.showIframePromise();},
          submitIframePromise: function submitIframePromise() {return _this.submitIframePromise();},
          isIframeLoaded: function isIframeLoaded() {return _this.instance.iframeLoaded;} });

      }
    };_this.state = { errorMsg: '' };_this.divIframeId = 'iframe-' + (0, _v2.default)();return _this;}(0, _createClass3.default)(PCIIframe, [{ key: 'showIframePromise', value: function showIframePromise()

    {var _this2 = this;
      return this.instance.showIframePromise().
      catch(function (err) {return _this2.handleError(err);});
    } }, { key: 'submitIframePromise', value: function submitIframePromise()

    {var _this3 = this;
      return this.instance.submitIframePromise().
      catch(function (err) {return _this3.handleError(err);});
    } }, { key: 'handleError', value: function handleError(

    err) {
      switch (err) {
        case _activenetPciIframe.ERRORMESSAGES.TERMINATION:
          this.setState({ errorMsg: err });
          break;
        case _activenetPciIframe.ERRORMESSAGES.INPROGRESS:
          (0, _dialog.confirm)(err, { title: 'Error' });
          break;
        default:
          break;}

      return _promise2.default.reject(err);
    } }, { key: 'render', value: function render()

    {var
      errorMsg = this.state.errorMsg;
      return (
        _react2.default.createElement('div', { className: 'iframeContainer', id: this.divIframeId, style: this.props.style },

          errorMsg && _react2.default.createElement(_AlertBar2.default, {
            message: errorMsg,
            className: 'iframe-error',
            type: 'error',
            noClose: true })));



    } }]);return PCIIframe;}(_react.PureComponent);PCIIframe.displayName = 'PCIIframe';PCIIframe.defaultProps = IframeProps;PCIIframe.propTypes = PCIIframePropTypes;exports.default = PCIIframe;module.exports = exports['default'];