import { AxiosRequestConfig } from 'axios';
import getRequest from '.';
const BASEURL = 'cart';

function addProductToCart<T>({ productId, size }: { productId: string; size: string }, config?: AxiosRequestConfig) {
    return getRequest<T>({ ...config, url: `${BASEURL}/add`, method: 'POST', data: { itemId: productId, size } });
}

function updateQuantity<T>({ productId, size, quantity }: { productId: string; size: string; quantity: number }, config?: AxiosRequestConfig) {
    return getRequest<T>({ ...config, url: `${BASEURL}/update`, method: 'POST', data: { itemId: productId, size, quantity } });
}

function getUserCart<T>(_?: any, config?: AxiosRequestConfig) {
    return getRequest<T>({ ...config, url: `${BASEURL}/get`, method: 'GET' });
}

export { addProductToCart, updateQuantity, getUserCart };
