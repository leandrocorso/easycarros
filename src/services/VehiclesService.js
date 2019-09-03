import Api from "./Api";

class VehiclesService {
  // Get all vehicles
  static async getAll() {
    const token = sessionStorage.getItem("token");
    return await Api.get("/vehicle", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Store a vehicle
  static async store(data) {
    const token = sessionStorage.getItem("token");
    return await Api.post(
      "/vehicle",
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  // Destroy a vehicle
  static async destroy(data) {
    const token = sessionStorage.getItem("token");
    return await Api.delete(`/vehicle/${data.id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
export default VehiclesService;
