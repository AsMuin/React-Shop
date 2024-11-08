import request from '.';
const BASEURL = 'user';
function login({ email, password }: { email: string; password: string }) {
    return request({ url: `${BASEURL}/login`, method: 'POST', data: { email, password } });
}
function register({ name, email, password }: { name: string; email: string; password: string }) {
    return request({ url: `${BASEURL}/register`, method: 'POST', data: { name, email, password } });
}

export { login, register };
