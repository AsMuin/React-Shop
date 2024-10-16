import { createContext, useState } from 'react';
import { products } from '@/assets/assets';
export interface ProductItem {
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
    search?: string;
    setSearch?: React.Dispatch<React.SetStateAction<string>>;
    showSearch?: boolean;
    setShowSearch?: React.Dispatch<React.SetStateAction<boolean>>;
}>({});

const ShopContextProvider = function (props: { children: React.ReactNode }) {
    const currency = '￥';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);
    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch
    };
    return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
