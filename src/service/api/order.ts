import { IRequestConfig } from '.';
import getRequest from '.';
const BASEURL = '/order';

function postOrder<T>({ address, items, amount, ...config }: { address: object; items: any[]; amount: number } & Partial<IRequestConfig>) {
    return getRequest<T>({ ...config, url: `${BASEURL}/place`, method: 'POST', data: { address, items, amount } });
}

function stripeOrder<T>({ address, items, amount, ...config }: { address: object; items: any[]; amount: number } & Partial<IRequestConfig>) {
    return getRequest<T>({ ...config, url: `${BASEURL}/stripe`, method: 'POST', data: { address, items, amount } });
}

function getUserOrderList<T>({ ...config }: Partial<IRequestConfig>) {
    return getRequest<T>({ ...config, url: `${BASEURL}/userOrders`, method: 'GET' });
}

function verifyStripe<T>({ orderId, success, ...config }: { orderId: string; success: boolean } & Partial<IRequestConfig>) {
    return getRequest<T>({ ...config, url: `${BASEURL}/verifyStripe`, method: 'POST', data: { orderId, success } });
}

export { postOrder, getUserOrderList, stripeOrder, verifyStripe };
