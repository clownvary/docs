const easeInOutCubic = (t, b, c, d) => {
  const cc = c - b;
  let tp = t / (d / 2);
  if (tp < 1) {
    return ((cc / 2) * tp * tp * tp) + b;
  }
  return ((cc / 2) * (((tp -= 2) * tp * tp) + 2)) + b;
};

export default easeInOutCubic;
