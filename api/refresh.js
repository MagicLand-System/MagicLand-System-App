import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";

const URL = "https://magic-land-system.azurewebsites.net";

const instance = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    if (err.response) {
      if (err.response.status === 401) {
        alert('Hãy đăng nhập để tiếp tục!')
        await signOut(auth)
      }
    }
    return Promise.reject(err);
  }
);

export const refresh = async (oldToken) => {
  const response = await instance.post("/api/v1/auth/refreshToken", { oldToken: oldToken });
  return response.data;
};
