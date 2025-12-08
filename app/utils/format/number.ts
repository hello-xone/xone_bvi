import BigNumber from 'bignumber.js';
import numeral from 'numeral';

/**
 * 格式化bignumber
 * @param amount
 */
export const formatNumber = (amount?: BigNumber.Value, decimalPlaces = 6) => {
  if (!amount) {
    return '0';
  }

  const roundedAmount = BigNumber(amount).dp(
    decimalPlaces,
    BigNumber.ROUND_DOWN
  );

  const formattedAmount = numeral(roundedAmount.toString()).format(
    `0,0.[${'0'.repeat(decimalPlaces)}]`
  );

  if (formattedAmount === 'NaN') {
    return formatBigNumber(amount, decimalPlaces);
  }

  return formattedAmount;

  // return numeral(amount.toString()).format(`0,0.[${'0'.repeat(decimalPlaces)}] floor`);
};

export function formatDecimal(num: number | string, maxDecimals = 5) {
  const str = num.toString();
  const [integerPart, decimalPart] = str.split(".");

  if (!decimalPart) return integerPart;

  const trimmedDecimal = decimalPart
    .substring(0, maxDecimals)
    .replace(/0+$/, "");

  return trimmedDecimal ? `${integerPart}.${trimmedDecimal}` : integerPart;
}

const formatBigNumber = (amount?: BigNumber.Value, decimalPlaces = 4) => {
  if (!amount) {
    return '0';
  }
  return BigNumber(BigNumber(amount).toFixed(decimalPlaces)).toFormat();
};

export function formatNumberAsAbbreviated(input: any) {
  return numeral(input).format('0.0a').toUpperCase();
}

export function formatTSNumber(input: any, isDecimal = true) {
  return numeral(input).format(`0,0${isDecimal ? '.00' : ''}`);
}

export function formatUnitsNumber(num: number): { value: string, unit: string } {
  if (num < 1000) return {
    value: num?.toString?.() ?? "0",
    unit: ''
  };

  const units = [
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'B' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'K' }
  ];

  for (const unit of units) {
    if (num >= unit.value) {
      const formatted = (num / unit.value).toFixed(2);
      const value = formatted.replace(/\.?0+$/, '')
      return {
        value,
        unit: unit.symbol
      };
    }
  }

  return {
    value: num?.toString?.() ?? "0",
    unit: ''
  };
}