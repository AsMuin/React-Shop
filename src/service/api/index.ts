import axios from 'axios';
import type { AxiosResponse, AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
interface IData<T = any> {
    success: boolean;
    message: string;
    data?: T;
    token?: string;
}
const baseURL = '/api';
const Axios = axios.create({
    baseURL
});
Axios.interceptors.request.use(
    config => {
        if (config.url === '/user/login' || config.url === '/user/register' || config.url === '/product/list') {
            return config;
        } else {
            const token = localStorage.getItem('token');
            if (!token) {
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2500);
                return Promise.reject(new Error('请先登录'));
            } else {
                config.headers.Authorization = token;
                return config;
            }
        }
    },
    error => {
        toast.error(error);
        return Promise.reject(error);
    }
);
Axios.interceptors.response.use(
    (response: AxiosResponse<IData, any>) => {
        const { data } = response;
        if (data.success) {
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
            return response;
        } else {
            toast.error(data.message);
            return Promise.reject(data.message);
        }
    },
    error => {
        toast.error(error.message);
        return Promise.reject(error);
    }
);
async function request<T = any>(config: AxiosRequestConfig): Promise<IData<T>> {
    const Response = await Axios.request<IData<T>>(config);
    return Response.data;
}
export default request;
