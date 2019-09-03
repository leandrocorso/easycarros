import { combineReducers } from "redux";

import loginReducer from "./login/reducers";
import vehiclesReducer from "./vehicles/reducers";

const rootReducers = combineReducers({
  login: loginReducer,
  vehicles: vehiclesReducer
});

export default rootReducers;
