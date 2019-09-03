import { takeEvery, put, call } from "redux-saga/effects";
import VehiclesService from "../../services/VehiclesService";

import { FETCH_VEHICLES, STORE_VEHICLE, DESTROY_VEHICLE } from "./actionTypes";

// Get the vehicles list

function* getAll() {
  try {
    const result = yield call(VehiclesService.getAll);
    if (result.status === 200) {
      yield put({ type: FETCH_VEHICLES.SUCCESS, data: result.data.data });
    } else {
      yield put({ type: FETCH_VEHICLES.FAILURE, error: result.error });
    }
  } catch (error) {
    yield put({
      type: FETCH_VEHICLES.FAILURE,
      error: error.response.data.error.message
    });
  }
}

// Save a new vehicle

function* store(action) {
  try {
    const result = yield call(VehiclesService.store, action.payload);
    if (result.status === 200) {
      yield put({ type: STORE_VEHICLE.SUCCESS, success: result.statusText });
      yield put({ type: FETCH_VEHICLES.REQUEST });
    } else {
      yield put({ type: STORE_VEHICLE.FAILURE, error: result.error });
    }
  } catch (error) {
    yield put({
      type: STORE_VEHICLE.FAILURE,
      error: error.response.data.error.message
    });
  }
}

// Delete a vehicle

function* destroy(action) {
  try {
    const result = yield call(VehiclesService.destroy, action.payload);
    if (result.status === 204) {
      yield put({ type: DESTROY_VEHICLE.SUCCESS, success: "Deleted" });
      yield put({ type: FETCH_VEHICLES.REQUEST });
    } else {
      yield put({ type: DESTROY_VEHICLE.FAILURE, error: result.error.message });
    }
  } catch (error) {
    yield put({
      type: DESTROY_VEHICLE.FAILURE,
      error: error.response.data.error.message
    });
  }
}

export default [
  takeEvery(FETCH_VEHICLES.REQUEST, getAll),
  takeEvery(STORE_VEHICLE.REQUEST, store),
  takeEvery(DESTROY_VEHICLE.REQUEST, destroy)
];
