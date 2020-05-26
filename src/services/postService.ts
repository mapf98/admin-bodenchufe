import { API_URL } from "./config";

export default {
  getProducts() {
    return API_URL.get("/product", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  getProviders() {
    return API_URL.get("/provider", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  getOffers() {
    return API_URL.get("/offer");
  },
  createPost(payload: any) {
    return API_URL.post("/product", payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
};
