import { GET_CURRENCY } from './types';

const url = 'https://economia.awesomeapi.com.br/json/all';

export function getCurrencyReducer(payload) {
  return {
    type: GET_CURRENCY,
    payload,
  };
}

export const getCurrency = () => async (dispatch) => {
  const response = await fetch(url);
  const currency = await response.json();
  const currencyArray = Object.keys(currency).filter((key) => key !== 'USDT');
  dispatch(getCurrencyReducer(currencyArray));
};