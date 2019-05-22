import isElement from 'lodash/isElement';
import popupMenu from './popupMenu';

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
export const attachPopupMenu = (id, menuOptions, popupOptions) => {
  const { target } = popupOptions;
  if (!isElement(target)) {
    throw new Error('Target is not a DOM element.');
  }

  if (target.__menuAttached) return;

  const onPopupMenu = () => {
    popupMenu(id, menuOptions, popupOptions);
  };

  target.addEventListener('click', onPopupMenu);
  target.__menuAttached = true;
};

/**
 * @function clearPopupMenu
 * @description Remove PopUpMenu from a dom element
 * @param {DOM} target - Dom element which will be removed PopupMenu
 */
export const clearPopupMenu = (target) => {
  if (!isElement(target)) {
    throw new Error('Target is not a DOM element.');
  }

  delete target.__menuAttached;
};

