import { AxiosRequestConfig } from 'axios';
import useRequest from '.';
const BASEURL = '/order';

function postOrder<T>({ address, items, amount }: { address: object; items: any[]; amount: number }, ...config: AxiosRequestConfig[]) {
    return useRequest<T>({ ...config, url: `${BASEURL}/place`, method: 'POST', data: { address, items, amount } });
}

function stripeOrder<T>({ address, items, amount }: { address: object; items: any[]; amount: number }, ...config: AxiosRequestConfig[]) {
    return useRequest<T>({ ...config, url: `${BASEURL}/stripe`, method: 'POST', data: { address, items, amount } });
}

function getUserOrderList<T>(...config: AxiosRequestConfig[]) {
    return useRequest<T>({ ...config, url: `${BASEURL}/userOrders`, method: 'GET' });
}

function verifyStripe<T>({ orderId, success }: { orderId: string; success: boolean }, ...config: AxiosRequestConfig[]) {
    return useRequest<T>({ ...config, url: `${BASEURL}/verifyStripe`, method: 'POST', data: { orderId, success } });
}

export { postOrder, getUserOrderList, stripeOrder, verifyStripe };
