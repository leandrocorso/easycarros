import { all } from "redux-saga/effects";

import loginSagas from "./login/sagas";
import vehiclesSagas from "./vehicles/sagas";

export default function* rootSagas() {
  yield all([...loginSagas, ...vehiclesSagas]);
}
