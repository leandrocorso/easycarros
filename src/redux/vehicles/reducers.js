import {
  FETCH_VEHICLES,
  STORE_VEHICLE,
  DESTROY_VEHICLE,
  SELECT_VEHICLE_TO_DESTROY,
  CLEAR_VEHICLES_MESSAGES
} from "./actionTypes";

const INITIAL_STATE = {
  isLoading: false,
  success: null,
  error: null,
  toDestroy: null,
  data: []
};

export default function reducers(state = INITIAL_STATE, action) {
  // Fetch vehicles

  switch (action.type) {
    case FETCH_VEHICLES.REQUEST:
      return { ...state, isLoading: true };

    case FETCH_VEHICLES.SUCCESS:
      return { ...state, isLoading: false, data: action.data };

    case FETCH_VEHICLES.FAILURE:
      return { ...state, isLoading: false, error: action.error };

    // Store vehicles

    case STORE_VEHICLE.REQUEST:
      return { ...state, isLoading: true };

    case STORE_VEHICLE.SUCCESS:
      return { ...state, isLoading: false, success: action.success };

    case STORE_VEHICLE.FAILURE:
      return { ...state, isLoading: false, error: action.error };

    // Select a vehicle to destroy

    case SELECT_VEHICLE_TO_DESTROY:
      return { ...state, toDestroy: action.payload.id };

    // Destroy a vehicle

    case DESTROY_VEHICLE.REQUEST:
      return { ...state, isLoading: true };

    case DESTROY_VEHICLE.SUCCESS:
      return {
        ...state,
        isLoading: false,
        toDestroy: null,
        success: action.success
      };

    case DESTROY_VEHICLE.FAILURE:
      return {
        ...state,
        isLoading: false,
        toDestroy: null,
        error: action.error
      };

    // Clear messages

    case CLEAR_VEHICLES_MESSAGES:
      return { ...state, success: null, error: null };

    default:
      return state;
  }
}
