import request from '.';
const BASEURL = 'cart';

function addProductToCart<T>({ productId, size }: { productId: string; size: string }) {
    return request<T>({ url: `${BASEURL}/add`, method: 'POST', data: { itemId: productId, size } });
}

function updateQuantity<T>({ productId, size, quantity }: { productId: string; size: string; quantity: number }) {
    return request<T>({ url: `${BASEURL}/update`, method: 'POST', data: { itemId: productId, size, quantity } });
}

function getUserCart<T>() {
    return request<T>({ url: `${BASEURL}/get`, method: 'GET' });
}

export { addProductToCart, updateQuantity, getUserCart };
