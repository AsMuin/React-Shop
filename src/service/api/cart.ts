import { AxiosRequestConfig } from 'axios';
import useRequest from '.';
const BASEURL = 'cart';

function addProductToCart<T>({ productId, size }: { productId: string; size: string },...config: AxiosRequestConfig[]) {
    return useRequest<T>({...config, url: `${BASEURL}/add`, method: 'POST', data: { itemId: productId, size } });
}

function updateQuantity<T>({ productId, size, quantity }: { productId: string; size: string; quantity: number },...config: AxiosRequestConfig[]) {
    return useRequest<T>({...config, url: `${BASEURL}/update`, method: 'POST', data: { itemId: productId, size, quantity } });
}

function getUserCart<T>(...config: AxiosRequestConfig[]) {
    return useRequest<T>({...config, url: `${BASEURL}/get`, method: 'GET' });
}

export { addProductToCart, updateQuantity, getUserCart };
