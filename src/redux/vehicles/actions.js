import {
  STORE_VEHICLE,
  FETCH_VEHICLES,
  DESTROY_VEHICLE,
  SELECT_VEHICLE_TO_DESTROY,
  CLEAR_VEHICLES_MESSAGES
} from "./actionTypes";

export function getAll() {
  return {
    type: FETCH_VEHICLES.REQUEST
  };
}

export function store(plate) {
  return {
    type: STORE_VEHICLE.REQUEST,
    payload: { plate }
  };
}

export function toDestroy(id) {
  return {
    type: SELECT_VEHICLE_TO_DESTROY,
    payload: { id }
  };
}

export function destroy(id) {
  return {
    type: DESTROY_VEHICLE.REQUEST,
    payload: { id }
  };
}

export function clearVehiclesMessages() {
  return {
    type: CLEAR_VEHICLES_MESSAGES
  };
}
