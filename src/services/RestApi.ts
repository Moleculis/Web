import axios, {AxiosError} from "axios";
import {getLanguage, getToken} from "./Storage";

export interface ErrorResponse{
    status:number,
    message:string
}

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
})

axiosInstance.interceptors.request.use(config => {
    config.headers["Accept-Language"] = getLanguage();
    const token: string | null = getToken();
    if(token){
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
        return response;
    },
    (error: AxiosError) : Promise<ErrorResponse> => {
        const errorResponse: ErrorResponse = error.response?.data;
        return Promise.reject(errorResponse);
    });

axiosInstance.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";
axiosInstance.defaults.headers.common["accept"] = "application/json";

export default axiosInstance;