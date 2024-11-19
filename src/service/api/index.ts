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

//请求拦截器
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

//响应拦截器
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

//请求方法
async function getRequest<T = any>(config: AxiosRequestConfig): Promise<IData<T>> {
    try {
        const Response = await Axios.request<IData<T>>(config);
        return Response.data;
    } catch (error: any) {
        // 记录错误日志
        console.error('Request failed:', error);
        throw error; // 重新抛出错误
    }
}

export default getRequest;
