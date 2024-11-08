import request from '.';

function addProductToCart<T>({ productId, size }: { productId: string; size: string }) {
    return request<T>({ url: 'cart/add', method: 'POST', data: { productId, size } });
}
export { addProductToCart };
