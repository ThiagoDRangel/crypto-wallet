import { USER_LOGIN } from './types';

export function userLogin(payload) {
  return {
    type: USER_LOGIN,
    payload,
  };
}