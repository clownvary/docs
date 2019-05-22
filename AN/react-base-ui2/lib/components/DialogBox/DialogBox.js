'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.DialogBoxDefaultProps = exports.DialogBoxPropTypes = undefined;var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _Modal = require('../Modal');var _Modal2 = _interopRequireDefault(_Modal);
var _Button = require('../Button');var _Button2 = _interopRequireDefault(_Button);
var _ContentView = require('./ContentView');var _ContentView2 = _interopRequireDefault(_ContentView);
var _popup = require('../../services/popup');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                            * Default PropTypes of DialogBox.
                                                                                                                                            */
var DialogBoxPropTypes = exports.DialogBoxPropTypes = {
  /**
                                                         * The callback function that is triggered when click the cancel button.
                                                         */
  onCancel: _propTypes2.default.func,
  /**
                                       * The callback function that is triggered when click the confirm button.
                                       */
  onConfirm: _propTypes2.default.func,
  /**
                                        * Determines dialog title.
                                        */
  title: _propTypes2.default.string,
  /**
                                      * Determines dialog content.
                                      */
  contentView: _propTypes2.default.func,
  /**
                                          * Determines the props of content view.
                                          */
  contentProps: _propTypes2.default.object,
  /**
                                             * Whether to display the cancel button.
                                             */
  showCancel: _propTypes2.default.bool,
  /**
                                         * Determines cancel text.
                                         */
  cancelText: _propTypes2.default.string,
  /**
                                           * Determines confirm text.
                                           */
  confirmText: _propTypes2.default.string,

  /**
                                           * Determines whether to use useDangerouslySetInnerHTML to translate text.
                                           */
  dangerMode: _propTypes2.default.bool };


/** Default Props for DialogBox. */
var DialogBoxDefaultProps = exports.DialogBoxDefaultProps = {
  title: 'Dialog',
  cancelText: 'Cancel',
  confirmText: 'OK',
  showCancel: false,
  dangerMode: false };


/** UI component that displays DialogBox with variant settings.*/var
DialogBox = function (_React$PureComponent) {(0, _inherits3.default)(DialogBox, _React$PureComponent);function DialogBox() {(0, _classCallCheck3.default)(this, DialogBox);return (0, _possibleConstructorReturn3.default)(this, (DialogBox.__proto__ || (0, _getPrototypeOf2.default)(DialogBox)).apply(this, arguments));}(0, _createClass3.default)(DialogBox, [{ key: 'onCancel', value: function onCancel()




    {
      this.contentView.onCancel();var

      onCancel = this.props.onCancel;
      if ((0, _isFunction2.default)(onCancel)) {
        onCancel();
      }
    } }, { key: 'onConfirm', value: function onConfirm()

    {
      var data = this.contentView.getData();
      this.contentView.onConfirm(data);var

      onConfirm = this.props.onConfirm;
      if ((0, _isFunction2.default)(onConfirm)) {
        onConfirm(data);
      }
    } }, { key: 'updateView', value: function updateView(

    props) {
      this.contentView.update(props);
    } }, { key: 'render', value: function render()

    {var _this2 = this;var _props =










      this.props,title = _props.title,contentView = _props.contentView,_props$contentProps = _props.contentProps,contentProps = _props$contentProps === undefined ? {} : _props$contentProps,className = _props.className,showCancel = _props.showCancel,cancelText = _props.cancelText,confirmText = _props.confirmText,shown = _props.shown,dangerMode = _props.dangerMode;

      var View = contentView || _ContentView2.default;

      return (
        _react2.default.createElement(_Modal2.default, { shown: shown, title: title, className: (0, _classnames2.default)('dialogbox', className), onClose: function onClose() {return _this2.onCancel();} },
          _react2.default.createElement('div', { className: 'modal-body' },
            _react2.default.createElement(View, (0, _extends3.default)({},
            contentProps, {
              dangerMode: dangerMode,
              ref: function ref(c) {_this2.contentView = c;} }))),


          _react2.default.createElement('div', { className: 'modal-footer' },
            showCancel ?
            _react2.default.createElement(_Button2.default, { type: 'secondary', onClick: function onClick() {return _this2.onCancel();} },
              cancelText) :

            '',


            _react2.default.createElement(_Button2.default, { type: 'strong', onClick: function onClick() {return _this2.onConfirm();} },
              confirmText))));




    } }]);return DialogBox;}(_react2.default.PureComponent);DialogBox.displayName = 'DialogBox';DialogBox.propTypes = DialogBoxPropTypes;DialogBox.defaultProps = DialogBoxDefaultProps;



var popupService = (0, _popup.createPopupService)(DialogBox);

/**
                                                               * Popup a Dialog.
                                                               * @function popup
                                                               * @param {object} popupOptions - Configured options of popup service
                                                               * when calling the popup.
                                                               * @param {object} dialogBoxOptions - Configured options of DialogBox
                                                               * when calling the popup.
                                                               * @returns {Promise} Returns a promise, from where we can get the selected date or error.
                                                               */
DialogBox.popup = function () {var popupOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var dialogBoxOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var popupInstance = void 0;

  popupOptions.closeByClick = false;
  popupOptions.closeByEscape = true;
  popupOptions.focus = true;
  dialogBoxOptions.shown = true;
  /* istanbul ignore next */
  dialogBoxOptions.onCancel = function () {
    if (popupInstance) {
      popupInstance.cancel();
    }
  };
  /* istanbul ignore next */
  dialogBoxOptions.onConfirm = function (value) {
    if (popupInstance) {
      popupInstance.change(value);
    }
  };

  popupInstance = popupService.popup(popupOptions, dialogBoxOptions);
  return popupInstance;
};exports.default =

DialogBox;