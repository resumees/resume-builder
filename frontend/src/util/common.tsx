export const parseCurrency = (currencyString: string | number) => {
  if (typeof currencyString === 'string') {
    const numberString = currencyString.replace(/[$,]/g, "");
    return parseInt(numberString, 10);
  } else if (typeof currencyString === 'number') {
    return currencyString;
  } else return 0
};