import isFunction from 'lodash/isFunction';
import isEmpty from 'lodash/isEmpty';
import List, { ListType, SelectionMode } from '../../components/List';

/**
 * @function popupMenu
 * @description Popup a menu immediately, you don't need to use this method in most time,
 * just using attachPopupMenu method.
 *
 * All params are same with attachPopupMenu method,@see {@link attachPopupMenu}
 */
const popupMenu = (id = '', menuOptions = {}, popupOptions = {}) => {
  let list = null;
  const { onSelected, data = [], ...rest } = menuOptions;
  const listOptions = {
    data,
    config: {
      selectionMode: SelectionMode.SINGLE,
      listType: ListType.SINGLE
    },
    ...rest,
    onChange: (selected) => {
      if (isFunction(onSelected) && !isEmpty(selected)) {
        const item = data[selected[0]];
        onSelected({
          text: item.text,
          value: item.value,
          id
        });
      }
      if (list) {
        list.cancel();
      }
    }
  };

  popupOptions = {
    showShadow: true,
    distance: 4,
    closeByEscape: true,
    focus: true,
    ...popupOptions
  };
  list = List.popup(listOptions, popupOptions);
};


export default popupMenu;
