import AuthService from "./auth";
export default function authHeader() {
    const token = AuthService.getCurrentToken();
    if (token) {
      return { "authorization": 'Bearer ' +  token }; // for Spring Boot back-end
      // return { 'x-token-token': token };       // for Node.js Express back-end
    } else {
      return {};
    }
  }