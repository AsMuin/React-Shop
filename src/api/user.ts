import request from '.';

function login<T>({ email, password }: { email: string; password: string }) {
    return request<T>({ url: '/user/login', method: 'POST', data: { email, password } });
}
export { login };
