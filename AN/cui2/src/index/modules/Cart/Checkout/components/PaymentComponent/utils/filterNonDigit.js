const filterNonDigit = (e) => {
  const value = e.target.value;
  const regedValue = value.replace(/[^\d]/g, '');

  regedValue !== value && (e.target.value = regedValue);
};

export default {
  filterNonDigit
};
