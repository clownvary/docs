export const isNullOrEmpty = (val) => {
  if (val == null) {
    return true;
  }

  if (val === '') {
    return true;
  }

  return false;
};

export default {
  isNullOrEmpty
};
