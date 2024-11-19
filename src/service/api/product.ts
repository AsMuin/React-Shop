import { AxiosRequestConfig } from 'axios';
import getRequest from '.';
const BASEURL = '/product';

function getProductList<T>(...config: AxiosRequestConfig[]) {
    return getRequest<T>({ ...config, url: `${BASEURL}/list`, method: 'get' });
}

export { getProductList };
