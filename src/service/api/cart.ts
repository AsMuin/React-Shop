import { IRequestConfig } from '.';
import getRequest from '.';
const BASEURL = 'cart';

function addProductToCart<T>({ productId, size, ...config }: { productId: string; size: string } & Partial<IRequestConfig>) {
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
} & Partial<IRequestConfig>) {
    return getRequest<T>({ ...config, url: `${BASEURL}/update`, method: 'POST', data: { itemId: productId, size, quantity } });
}
function getUserCart<T>({ ...config }: Partial<IRequestConfig>) {
    return getRequest<T>({ ...config, url: `${BASEURL}/get`, method: 'GET' });
}

export { addProductToCart, updateQuantity, getUserCart };
