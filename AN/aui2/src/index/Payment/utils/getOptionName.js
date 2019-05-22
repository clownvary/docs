export default function getOptionName(item) {
  let itemLabel = '';

  item.list.forEach((option) => {
    if (option.id === item.activeVal) {
      itemLabel = option.name;
    }
  });

  return itemLabel;
}
