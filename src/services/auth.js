import axios from "axios";
import authHeader from "./auth-header";

const BASE_URI = "http://35.246.90.79:8000";
const API_URL = "http://35.246.90.79:8000/api/auth/";

class AuthService {
  async login(username, password) {
    let { data } = await this.getToken({ username, password });
    localStorage.setItem("user", JSON.stringify({ token: data.access }));
    axios
      .get(API_URL + "user/", {
        headers: authHeader(),
      })
      .then((response) => {
        if (response.data) {
          localStorage.setItem(
            "user",
            JSON.stringify(
              Object.assign(JSON.parse(localStorage.getItem("user")), {
                user: response.data,
              })
            )
          );
          return Promise.resolve({ message: "Login Success!" });
        }
        return Promise.reject({ error: "Login unsuccess!" });
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
        return Promise.reject({ error: "Login unsuccess!" });
      });
  }

  async getToken({ username, password }) {
    return axios.post(API_URL + "jwt/create", {
      username,
      password,
    });
  }

  logout() {
    localStorage.removeItem("user");
  }

  setUserProfile() {
    return axios
      .get(API_URL + "user/profile", {
        headers: authHeader(),
      })
      .then((response) => {
        if (response.data) {
          localStorage.setItem(
            "user",
            JSON.stringify(
              Object.assign(JSON.parse(localStorage.getItem("user")), {
                profile: response.data[0].fields,
              })
            )
          );
          return axios
            .get(API_URL + "user/file", {
              headers: authHeader(),
            })
            .then((res) => {
              if (res.data)
                localStorage.setItem(
                  "user",
                  JSON.stringify(
                    Object.assign(JSON.parse(localStorage.getItem("user")), {
                      profile: Object.assign(
                        JSON.parse(localStorage.getItem("user")).profile,
                        {
                          images: res.data.map((i) => BASE_URI + i.file),
                        }
                      ),
                    })
                  )
                );
              console.log({ res });
            })
            .catch((err) => {
              console.log({ err });
            });
        }
        return Promise.reject({ error: "Login unsuccess!" });
      })
      .catch((error) => {
        console.log({ error });
        return Promise.reject({ error: "Login unsuccess!" });
      });
  }

  getCurrentUser() {
    let user = JSON.parse(localStorage.getItem("user"))?.user;
    return user;
  }
  getCurrentUserProfile() {
    let user = JSON.parse(localStorage.getItem("user"))?.profile;
    return user;
  }
  getCurrentToken() {
    let token = JSON.parse(localStorage.getItem("user"))?.token;
    return token;
  }

  reset_password = ({ email }) => {
    const body = JSON.stringify({ email });
    return axios.post(`${API_URL}users/reset_password/`, { email });
  };
  reset_password_confirm = (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    return axios.post(`${API_URL}users/reset_password_confirm/`, data, config);
  };
  activation = ({ uid, token }) => {
    return axios.post(`${API_URL}users/activation/`, { uid, token });
  };
}

export default new AuthService();
