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

const controllers = new Map<string, AbortController>();

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
                // //设置取消控制器
                // const controller = new AbortController();
                // config.signal = controller.signal;
                // if(config.url){
                //      controllers.set(config.url, controller);
                // }
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
function getRequest<T = any>(config: AxiosRequestConfig): [Promise<AxiosResponse<IData<T>>>, AbortController] {
    try {
        // 设置取消控制器
        const controller = new AbortController();
        config.signal = config.signal || controller.signal;
        console.log(config);
        const Response = Axios.request<IData<T>>(config);
        return [Response, controller];
    } catch (error: any) {
        // 记录错误日志
        console.error('Request failed:', error);
        throw error; // 重新抛出错误
    }
}

//取消请求
function cancelRequest(url: string) {
    const controller = controllers.get(url);
    if (controller) {
        controller.abort();
        controllers.delete(url);
        console.log('取消请求,地址为😥', url);
    }
}

export default getRequest;

export { cancelRequest };
