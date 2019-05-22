const escapeCell = (value) => {
  return value
    // .replace(/</g, '&lt;')
    .replace(/\|/g, '&#124;')
    // .replace(/\n\n/g, '<br>')
    // .replace(/\n/g, ' ')
    .replace(/\r/g, '');
}

export default escapeCell;
