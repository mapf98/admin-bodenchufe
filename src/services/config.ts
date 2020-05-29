import axios from "axios";

export const API_URL = axios.create({
  baseURL: process.env.VUE_APP_API_URL_IP,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 30000,
});
