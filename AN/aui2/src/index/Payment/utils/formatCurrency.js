export default function (numParam) {
  let num = numParam;
  let isNegative = false;
  let cents = 0;
  num = parseFloat(num);

  if (isNaN(num)) {
    num = 0;
  }

  if (num < 0) {
    isNegative = true;
    num = -num;
  }

  cents = Math.floor((num * 100) + 0.5) % 100;
  num = Math.floor(((num * 100) + 0.5) / 100);

  if (cents < 10) {
    cents = `0${cents}`;
  }

  num += `.${cents}`;

  if (isNegative) {
    num = `-${num}`;
  }

  return num;
}

