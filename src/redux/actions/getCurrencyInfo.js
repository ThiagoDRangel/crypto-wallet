import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_SAVED_EXPENSE,
  EDIT_EXPENSE,
} from './types';

const url = 'https://economia.awesomeapi.com.br/json/all';

export function addExpenseReducer(payload, rates) {
  return {
    type: ADD_EXPENSE,
    payload: {
      exchangeRates: rates,
      ...payload,
    },
  };
}

export function deleteExpenseReducer(payload) {
  return {
    type: DELETE_EXPENSE,
    payload,
  };
}

export function editSavedExpense(payload) {
  return {
    type: EDIT_SAVED_EXPENSE,
    payload,
  };
}

export function editExpense(payload) {
  return {
    type: EDIT_EXPENSE,
    payload,
  };
}

export const getCurrencyValue = (payload) => async (dispatch) => {
  const response = await fetch(url);
  const currencyValue = await response.json();
  delete currencyValue.USDT;
  dispatch(addExpenseReducer(payload, currencyValue));
};