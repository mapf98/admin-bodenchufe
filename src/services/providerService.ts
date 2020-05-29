import { API_URL } from "./config";

export default {
  updatePost(payload: any) {
    return API_URL.patch("/provider/product", payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  updatePostStatus(payload: any) {
    return API_URL.patch("/provider/product/status", payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  updateProviderStatus(payload: any) {
    return API_URL.patch("/provider/status", payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  createProvider(payload: any) {
    return API_URL.post("/provider", payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
}