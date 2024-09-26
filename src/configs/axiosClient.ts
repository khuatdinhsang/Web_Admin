import axios from 'axios';
import setAxiosHeader from '../utils/setAxiosHeader';

const axiosClient = axios.create({
    baseURL: 'http://103.211.206.26:3000'
});

axiosClient.interceptors.request.use(
    async (config) => setAxiosHeader(config),
    (error) => {
        Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        return Promise.reject(error);
    }
);

export default axiosClient;