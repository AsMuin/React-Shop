import request from '.';
const BASEURL = '/product';
function getProductList<T>() {
    return request<T>({ url: `${BASEURL}/list`, method: 'get' });
}
export { getProductList };
