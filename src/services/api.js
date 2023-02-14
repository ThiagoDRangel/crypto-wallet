const url = 'https://economia.awesomeapi.com.br/json/all';

export const getCurrency = async () => {
  const response = await fetch(url);
  const currency = await response.json();
  const currencyArray = Object.keys(currency)
    .filter((key) => key !== 'USDT');
  return currencyArray;
};

export const getCurrencyValue = async () => {
  const response = await fetch(url);
  const currencyValue = await response.json();
  delete currencyValue.USDT;
  return currencyValue;
};
