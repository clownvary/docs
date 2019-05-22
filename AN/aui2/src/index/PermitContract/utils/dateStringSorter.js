import moment from 'moment';

const dateStringSorter = pattern => (({ value: a }, { value: b }) => {
  const ma = moment(a, pattern);
  const mb = moment(b, pattern);
  if (!ma.isValid() && mb.isValid()) {
    return -1;
  } else if (!ma.isValid() && !mb.isValid()) {
    return 0;
  } else if (ma.isValid() && !mb.isValid()) {
    return 1;
  }
  return ma.diff(mb);
});

export default dateStringSorter;

