import { API_URL } from "./config";

export default {
  signUp(user: any) {
    console.log(user);
    return API_URL.post(`/authentication/signUp`, user);
  },

  setUserPhoto(user: any) {
    return API_URL.put(`/user/photo`, user);
  },
};
