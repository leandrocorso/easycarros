import axios from "axios";
import { BASE_PATH } from "../utils/constants";

class Api {
  static get(uri, params) {
    return axios.get(`${BASE_PATH}${uri}`, { ...params });
  }

  static post(uri, params, headers) {
    return axios.post(`${BASE_PATH}${uri}`, { ...params }, headers);
  }

  static delete(uri, params, headers) {
    return axios.delete(`${BASE_PATH}${uri}`, headers, { ...params });
  }
}

export default Api;
