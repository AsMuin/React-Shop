import request from '.';
const BASEURL = '/order';
function postOrder<T>({ address, items, amount }: { address: object; items: any[]; amount: number }) {
    return request<T>({ url: `${BASEURL}/place`, method: 'POST', data: { address, items, amount } });
}
function getUserOrderList<T>() {
    return request<T>({ url: `${BASEURL}/userOrders`, method: 'GET' });
}
export { postOrder, getUserOrderList };
