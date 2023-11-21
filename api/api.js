import axios from "axios";
import { refresh } from "./refresh";
import AsyncStorage from "@react-native-async-storage/async-storage";

const url = "https://magic-land-system.azurewebsites.net";
const instance = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    async (config) => {
        const accessToken = await AsyncStorage.getItem("accessToken");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== "/api/v1/auth" && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const oldToken = await AsyncStorage.getItem("accessToken");
                    const data = await refresh(oldToken)
                    const accessToken = data.token;
                    await AsyncStorage.setItem("accessToken", accessToken);

                    return instance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }
        return Promise.reject(err);
    }
);

export default instance;
