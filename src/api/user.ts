import request from '.';
const BASEURL = '/user';
function login<T>({ email, password }: { email: string; password: string }) {
    return request<T>({ url: `${BASEURL}/login`, method: 'POST', data: { email, password } });
}
function register<T>({ name, email, password }: { name: string; email: string; password: string }) {
    return request<T>({ url: `${BASEURL}/register`, method: 'POST', data: { name, email, password } });
}
function updatePassword<T>({ originalPassword, password, confirmPassword }: { originalPassword: string; password: string; confirmPassword: string }) {
    return request<T>({ url: `${BASEURL}/updatePassword`, method: 'POST', data: { originalPassword, password, confirmPassword } });
}
function uploadAvatar<T>({ avatar }: { avatar: File }) {
    return request<T>({ url: `${BASEURL}/uploadAvatar`, method: 'POST', data: { avatar }, headers: { 'Content-Type': 'multipart/form-data' } });
}
export { login, register, updatePassword, uploadAvatar };
