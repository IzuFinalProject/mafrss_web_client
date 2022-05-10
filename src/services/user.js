import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:8000/api/auth/";

class UserService {
  getUsers() {
    return axios.get(API_URL + "userList/", { headers: authHeader() });
  }


  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }

  editUserProfile(user) {
    return axios
      .put(API_URL + "user/profile", user, {
        headers: authHeader(),
      })
      .then((response) => {
        if (response.data) {
          return Promise.resolve({ message: "Profile retrival Success!" });
        }
        return Promise.reject({ error: "Profile retrival unsuccess!" });
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
        return Promise.reject({ error: "Profile retrival unsuccess!" });
      });
  }
  createUser(user) {
    return axios
      .post(API_URL + "users/", user, {
        headers: authHeader(),
      })
  }
  uploadImages(user) {
    return axios
      .post(API_URL + "user/file", user, {
        headers: authHeader(),
      })
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          return Promise.resolve({ message: "Upload Success!" });
        }
        console.log({ response });
        return Promise.reject({ error: "Upload unsuccess!" });
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
        return Promise.reject({ error: "Upload unsuccess!" });
      });
  }
}

export default new UserService();
