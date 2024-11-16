import request from '.';
const BASEURL = '/user';
function login({ email, password }: { email: string; password: string }) {
    return request({ url: `${BASEURL}/login`, method: 'POST', data: { email, password } });
}
function register({ name, email, password }: { name: string; email: string; password: string }) {
    return request({ url: `${BASEURL}/register`, method: 'POST', data: { name, email, password } });
}
function updatePassword({ originalPassword, password, confirmPassword }: { originalPassword: string; password: string; confirmPassword: string }) {
    return request({ url: `${BASEURL}/updatePassword`, method: 'POST', data: { originalPassword, password, confirmPassword } });
}
function uploadAvatar({ avatar }: { avatar: File }) {
    return request({ url: `${BASEURL}/uploadAvatar`, method: 'POST', data: { avatar }, headers: { 'Content-Type': 'multipart/form-data' } });
}
export { login, register, updatePassword, uploadAvatar };
