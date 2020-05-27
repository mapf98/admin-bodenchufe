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
  getCategories() {
    return API_URL.get("/category/all", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  createPost(payload: any) {
    return API_URL.post("/product", payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  updateProductPhoto(payload: any) {
    console.log(payload);
    return API_URL.put("/product/photo", payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
};
