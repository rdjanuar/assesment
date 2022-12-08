import axios from "axios";
import { helper } from "@/utils";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = helper.getLocalStorage("user");
    const setToken = config;
    if (token) {
      setToken.headers.Authorization = `Bearer ${token.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
