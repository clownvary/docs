'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _isEmpty = require('lodash/isEmpty');var _isEmpty2 = _interopRequireDefault(_isEmpty);
var _List = require('../../components/List');var _List2 = _interopRequireDefault(_List);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                       * @function popupMenu
                                                                                                                                                                                       * @description Popup a menu immediately, you don't need to use this method in most time,
                                                                                                                                                                                       * just using attachPopupMenu method.
                                                                                                                                                                                       *
                                                                                                                                                                                       * All params are same with attachPopupMenu method,@see {@link attachPopupMenu}
                                                                                                                                                                                       */
var popupMenu = function popupMenu() {var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';var menuOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var popupOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var list = null;var
  onSelected = menuOptions.onSelected,_menuOptions$data = menuOptions.data,data = _menuOptions$data === undefined ? [] : _menuOptions$data,rest = (0, _objectWithoutProperties3.default)(menuOptions, ['onSelected', 'data']);
  var listOptions = (0, _extends3.default)({
    data: data,
    config: {
      selectionMode: _List.SelectionMode.SINGLE,
      listType: _List.ListType.SINGLE } },

  rest, {
    onChange: function onChange(selected) {
      if ((0, _isFunction2.default)(onSelected) && !(0, _isEmpty2.default)(selected)) {
        var item = data[selected[0]];
        onSelected({
          text: item.text,
          value: item.value,
          id: id });

      }
      if (list) {
        list.cancel();
      }
    } });


  popupOptions = (0, _extends3.default)({
    showShadow: true,
    distance: 4,
    closeByEscape: true,
    focus: true },
  popupOptions);

  list = _List2.default.popup(listOptions, popupOptions);
};exports.default =


popupMenu;module.exports = exports['default'];