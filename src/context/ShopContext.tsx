import { createContext, useEffect, useState } from 'react';
import { products } from '@/assets/assets';
import { toast } from 'react-toastify';
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
    cartItems?: any;
    addToCart?: (productId: string, size: string) => void;
    getCartTotal?: () => number;
}>({});

const ShopContextProvider = function (props: { children: React.ReactNode }) {
    const currency = '￥';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);
    const [cartItems, setCartItems] = useState<any>({});

    function addToCart(productId: string, size: string) {
        if (!size) {
            toast.error('Please select a size');
            return;
        }
        const cartItemsCopy = structuredClone(cartItems);
        if (cartItemsCopy[productId]) {
            if (cartItemsCopy[productId][size]) {
                cartItemsCopy[productId][size] += 1;
            } else {
                cartItemsCopy[productId][size] = 1;
            }
        } else {
            cartItemsCopy[productId] = { [size]: 1 };
        }
        setCartItems(cartItemsCopy);
    }
    function getCartTotal() {
        let total = 0;
        for (const productId in cartItems) {
            for (const size in cartItems[productId]) {
                try {
                    if (cartItems[productId][size] > 0) {
                        total += cartItems[productId][size];
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        }
        return total;
    }
    useEffect(() => {
        console.log('cartItems', cartItems);
    });
    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartTotal
    };
    return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
