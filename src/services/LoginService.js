import Api from "./Api";

class LoginService {
  static async auth(data) {
    return await Api.post("/auth", data);
  }

  static isAuthenticated() {
    const token = sessionStorage.getItem("token");
    return token ? true : false;
  }
}
export default LoginService;
