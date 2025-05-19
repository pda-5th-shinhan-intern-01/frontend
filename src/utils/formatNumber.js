//num=1234.5678 -> 1,234.56
function formatNumberForMoney(num) {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export { formatNumberForMoney };
