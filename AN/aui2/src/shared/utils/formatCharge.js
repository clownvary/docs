export default function formatCharge(feeNumber) {
  let fee = '';

  if (feeNumber || feeNumber === 0) {
    if (feeNumber < 0) {
      fee = `-$${Math.abs(feeNumber).toFixed(2)}`;
    } else {
      fee = `$${feeNumber.toFixed(2)}`;
    }
  }

  return fee;
}
