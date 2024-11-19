import { AxiosRequestConfig } from 'axios';
import useRequest from '.';
const BASEURL = '/user';
function login<T>({ email, password }: { email: string; password: string },...config: AxiosRequestConfig[]) {
    return useRequest<T>({ ...config,url: `${BASEURL}/login`, method: 'POST', data: { email, password } });
}

function getInfo<T>(...config: AxiosRequestConfig[]) {
    return useRequest<T>({ ...config,url: `${BASEURL}/info`, method: 'GET' });
}

function register<T>({ name, email, password }: { name: string; email: string; password: string },...config: AxiosRequestConfig[]) {
    return useRequest<T>({...config, url: `${BASEURL}/register`, method: 'POST', data: { name, email, password } });
}

function updatePassword<T>({ originalPassword, password, confirmPassword }: { originalPassword: string; password: string; confirmPassword: string },...config: AxiosRequestConfig[]) {
    return useRequest<T>({ ...config,url: `${BASEURL}/updatePassword`, method: 'POST', data: { originalPassword, password, confirmPassword } });
}

function uploadAvatar<T>({ avatar }: { avatar: File },...config: AxiosRequestConfig[]) {
    return useRequest<T>({...config, url: `${BASEURL}/uploadAvatar`, method: 'POST', data: { avatar }, headers: { 'Content-Type': 'multipart/form-data' } });
}

function updateEmail<T>({ email }: { email: string },...config: AxiosRequestConfig[]) {
    return useRequest<T>({ ...config,url: `${BASEURL}/updateEmail`, method: 'POST', data: { email } });
}

function updateName<T>({ name }: { name: string },...config: AxiosRequestConfig[]) {
    return useRequest<T>({ ...config,url: `${BASEURL}/updateName`, method: 'POST', data: { name } });
}

export { login, register, updatePassword, uploadAvatar, getInfo, updateEmail, updateName };
