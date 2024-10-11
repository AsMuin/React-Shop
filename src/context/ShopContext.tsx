import { createContext } from 'react';
import { products } from '@/assets/assets';
interface ProductItem {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string[];
    category: string;
    subCategory: string;
    sizes: string[];
    date: number;
    bestseller: boolean;
}
export const ShopContext = createContext<{
    products?: ProductItem[];
    currency?: string;
    delivery_fee?: number;
}>({});

const ShopContextProvider = function (props: { children: React.ReactNode }) {
    const currency = '￥';
    const delivery_fee = 10;
    const value = {
        products,
        currency,
        delivery_fee
    };
    return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
