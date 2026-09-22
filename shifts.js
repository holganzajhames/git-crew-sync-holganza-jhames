function isValidShift(hours) {
  return hours > 0 && hours <= 24;
}

function calculatePay(hours, rate) {
  if (!isValidShift(hours) || hours === null || rate <= 0) {
    throw new Error('Invalid shift hours');
  }
  if (hours > 8) {
    const regularPay = 8 * rate;
    const overtimePay = (hours - 8) * rate * 1.5;
    return Math.round(regularPay + overtimePay);
  }
  return Math.round(hours * rate);
}

module.exports = { isValidShift, calculatePay };