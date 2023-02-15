import { USER_LOGIN } from '../actions/types';

const INITIAL_STATE = {
  email: '',
};

export const user = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case USER_LOGIN:
    return { ...state, email: payload };
  default:
    return state;
  }
};