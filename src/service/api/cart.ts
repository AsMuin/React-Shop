import { AxiosRequestConfig } from 'axios';
import getRequest from '.';
const BASEURL = 'cart';

function addProductToCart<T>({ productId, size, ...config }: { productId: string; size: string } & Partial<AxiosRequestConfig>) {
    return getRequest<T>({ ...config, url: `${BASEURL}/add`, method: 'POST', data: { itemId: productId, size } });
}

function updateQuantity<T>({
    productId,
    size,
    quantity,
    ...config
}: {
    productId: string;
    size: string;
    quantity: number;
} & Partial<AxiosRequestConfig>) {
    return getRequest<T>({ ...config, url: `${BASEURL}/update`, method: 'POST', data: { itemId: productId, size, quantity } });
}
function getUserCart<T>({ ...config }: AxiosRequestConfig) {
    return getRequest<T>({ ...config, url: `${BASEURL}/get`, method: 'GET' });
}

export { addProductToCart, updateQuantity, getUserCart };
