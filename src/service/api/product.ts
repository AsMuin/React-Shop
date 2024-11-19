import { AxiosRequestConfig } from 'axios';
import useRequest from '.';
const BASEURL = '/product';

function getProductList<T>(...config: AxiosRequestConfig[]) {
    return useRequest<T>({...config, url: `${BASEURL}/list`, method: 'get' });
}

export { getProductList };
