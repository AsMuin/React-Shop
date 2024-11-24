import { IRequestConfig } from '.';
import getRequest from '.';
const BASEURL = '/product';

function getProductList<T>({ ...config }: Partial<IRequestConfig>) {
    return getRequest<T>({ ...config, url: `${BASEURL}/list`, method: 'get' });
}

export { getProductList };
