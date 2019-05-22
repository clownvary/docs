'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.clearPopupMenu = exports.attachPopupMenu = undefined;var _isElement = require('lodash/isElement');var _isElement2 = _interopRequireDefault(_isElement);
var _popupMenu = require('./popupMenu');var _popupMenu2 = _interopRequireDefault(_popupMenu);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                            * @function attachPopupMenu
                                                                                                                                                                                            * @description Add a simple PopupMenu to a dom element
                                                                                                                                                                                            * @param {DOM} target - Dom element which will be added PopupMenu
                                                                                                                                                                                            * @param {Array} items - A menu list for content @see {@link List.ListPropTypes.data}
                                                                                                                                                                                            * @param {string} items.text - text of current item, it will display on menu
                                                                                                                                                                                            * @param {string} items.value - value of current item
                                                                                                                                                                                            * @param {string} id - PopupMenu's identify
                                                                                                                                                                                            * @param {Function} onSelected - A function that will be triggered when menu be selected
                                                                                                                                                                                            */
var attachPopupMenu = exports.attachPopupMenu = function attachPopupMenu(id, menuOptions, popupOptions) {var
  target = popupOptions.target;
  if (!(0, _isElement2.default)(target)) {
    throw new Error('Target is not a DOM element.');
  }

  if (target.__menuAttached) return;

  var onPopupMenu = function onPopupMenu() {
    (0, _popupMenu2.default)(id, menuOptions, popupOptions);
  };

  target.addEventListener('click', onPopupMenu);
  target.__menuAttached = true;
};

/**
    * @function clearPopupMenu
    * @description Remove PopUpMenu from a dom element
    * @param {DOM} target - Dom element which will be removed PopupMenu
    */
var clearPopupMenu = exports.clearPopupMenu = function clearPopupMenu(target) {
  if (!(0, _isElement2.default)(target)) {
    throw new Error('Target is not a DOM element.');
  }

  delete target.__menuAttached;
};