import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import map from 'lodash/map';

function noramlizeData(data = [], { valueField = 'id', textField = 'name' } = {}) {
  const selected = [];
  const newData = map(data, (item) => {
    if (item.selected) {
      selected.push(item[valueField]);
    }

    return Object.assign(item, {
      text: decodeHtmlStr(item[textField]),
      value: item[valueField]
    });
  });

  return {
    data: newData,
    selected
  };
}


export default noramlizeData;

export {
  noramlizeData
};
