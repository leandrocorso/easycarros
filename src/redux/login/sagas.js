import { takeEvery, put, call } from "redux-saga/effects";
import LoginService from "../../services/LoginService";
import { AUTH } from "./actionTypes";
import { CONN_ERROR_MSG } from "../../utils/constants";

function* auth(action) {
  try {
    const result = yield call(LoginService.auth, action.payload);
    if (result.status === 200) {
      // Saving the token into a session storage
      sessionStorage.setItem("token", result.data.data.token);
      yield put({ type: AUTH.SUCCESS });
    } else {
      yield put({ type: AUTH.FAILURE, error: result.error.message });
    }
  } catch (error) {
    yield put({ type: AUTH.FAILURE, error: CONN_ERROR_MSG });
  }
}

export default [takeEvery(AUTH.REQUEST, auth)];
