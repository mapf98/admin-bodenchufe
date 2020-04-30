import { API_URL } from "./config";

export default {
  getAllUsers() {
    return API_URL.get("/user/all");
  },
};
