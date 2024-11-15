import request from '.';
const BASEURL = '/order';
function postOrder<T>({ address, items, amount }: { address: object; items: any[]; amount: number }) {
    return request<T>({ url: `${BASEURL}/place`, method: 'POST', data: { address, items, amount } });
}
function stripeOrder<T>({ address, items, amount }: { address: object; items: any[]; amount: number }) {
    return request<T>({ url: `${BASEURL}/stripe`, method: 'POST', data: { address, items, amount } });
}
function getUserOrderList<T>() {
    return request<T>({ url: `${BASEURL}/userOrders`, method: 'GET' });
}
function verifyStripe<T>({ orderId, success }: { orderId: string; success: boolean }) {
    return request<T>({ url: `${BASEURL}/verifyStripe`, method: 'POST', data: { orderId, success } });
}
export { postOrder, getUserOrderList, stripeOrder, verifyStripe };
