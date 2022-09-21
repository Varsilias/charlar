import axios from "axios";
const baseURI = import.meta.env.VITE_APP_API_BASE_URL;

const instance = axios.create({
  baseURL: baseURI,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use(function (config) {
  // const token = localStorage.getItem("token");
  // config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
