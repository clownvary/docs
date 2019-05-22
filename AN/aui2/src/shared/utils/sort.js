export default function objArrSort(obj, sortName) {
  return obj.sort((a, b) => {
    const nameA = (typeof a[sortName]) === 'string' ? a[sortName].toUpperCase() : a[sortName];
    const nameB = (typeof b[sortName]) === 'string' ? b[sortName].toUpperCase() : b[sortName];

    if (nameA < nameB) {
      return -1;
    } else if (nameA > nameB) {
      return 1;
    }

    return 0;
  });
}
