import { AUTH, CLEAR_AUTH_MESSAGES } from "./actionTypes";

const INITIAL_STATE = {
  isLoading: false,
  error: null
};

export default function reducers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH.REQUEST:
      return { ...state, isLoading: true };

    case AUTH.SUCCESS:
      return { ...state, isLoading: false };

    case AUTH.FAILURE:
      return { ...state, isLoading: false, error: action.error };

    case CLEAR_AUTH_MESSAGES:
      return { ...state, error: null };

    default:
      return state;
  }
}
