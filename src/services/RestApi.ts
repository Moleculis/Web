import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
})

axiosInstance.interceptors.request.use(config => {
    return config;
}, error => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
        // TODO handle error responses
        return response;
    },
    (error) => {
        // TODO handle errors
        return Promise.reject(error);
    });

axiosInstance.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axiosInstance.defaults.headers.common['accept'] = 'application/json';

export default axiosInstance;