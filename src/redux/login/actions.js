import { AUTH, CLEAR_AUTH_MESSAGES } from "./actionTypes";

export function auth(email, password) {
  return {
    type: AUTH.REQUEST,
    payload: { email, password }
  };
}

export function clearAuthMessages() {
  return {
    type: CLEAR_AUTH_MESSAGES
  };
}
