import { API_URL } from "./config";

export default {
  checkLogIn(user: any) {
    return API_URL.post(`/authentication/login`, user);
  },
};
