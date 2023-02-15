// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  GET_CURRENCY,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_SAVED_EXPENSE,
  EDIT_EXPENSE,
} from '../actions/types';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

export const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_CURRENCY:
    return { ...state, currencies: payload };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, payload] };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== payload),
    };
  case EDIT_SAVED_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === payload.id) {
          return { ...expense, ...payload };
        }
        return expense;
      }),
      editor: false,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      editExpense: payload,
    };
  default:
    return state;
  }
};