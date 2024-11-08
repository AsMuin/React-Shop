import { createContext, useEffect, useState } from 'react';
import { products } from '@/assets/assets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addProductToCart, getUserCart, updateQuantity } from '@/api/cart';
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
export const ShopContext = createContext<
    | {
          products: ProductItem[];
          currency: string;
          delivery_fee: number;
          search: string;
          setSearch: React.Dispatch<React.SetStateAction<string>>;
          showSearch: boolean;
          setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
          cartItems: any;
          addToCart: (productId: string, size: string) => void;
          getCartTotal: () => number;
          updateCartItem: (productId: string, size: string, quantity: number) => void;
          getCartAmount: () => number;
          getUserCartData: () => void;
          navigate: ReturnType<typeof useNavigate>;
      }
    | undefined
>(undefined);

const ShopContextProvider = function (props: { children: React.ReactNode }) {
    const currency = '￥';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);
    const [cartItems, setCartItems] = useState<any>({});
    const navigate = useNavigate();
    // useEffect(() => {
    //     getUserCartData();
    // }, []);
    async function getUserCartData() {
        try {
            const response = await getUserCart();
            setCartItems(response.data);
            console.log('response', response);
        } catch (e) {
            console.error(e);
        }
    }
    async function addToCart(productId: string, size: string) {
        if (!size) {
            toast.error('Please select a size');
            return;
        }
        try {
            const response = await addProductToCart({ productId, size });
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
            toast.success(response.message);
        } catch (e: any) {
            console.error(e);
        }
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
    async function updateCartItem(productId: string, size: string, quantity: number) {
        try {
            const cartItemsCopy = structuredClone(cartItems);
            if (quantity < 1) {
                delete cartItemsCopy[productId][size];
                if (Object.keys(cartItemsCopy[productId]).length === 0) {
                    delete cartItemsCopy[productId];
                }
            } else {
                cartItemsCopy[productId][size] = quantity;
            }
            await updateQuantity({ productId, size, quantity });
            setCartItems(cartItemsCopy);
            toast.success('数量更新成功');
        } catch (e) {
            console.error(e);
        }
        const cartItemsCopy = structuredClone(cartItems);
        if (quantity < 1) {
            delete cartItemsCopy[productId][size];
            if (Object.keys(cartItemsCopy[productId]).length === 0) {
                delete cartItemsCopy[productId];
            }
        } else {
            cartItemsCopy[productId][size] = quantity;
        }
        setCartItems(cartItemsCopy);
    }
    function getCartAmount() {
        let totalAmount = 0;
        for (const productId in cartItems) {
            const productInfo = products.find(product => product._id === productId);
            try {
                for (const size in cartItems[productId]) {
                    totalAmount += cartItems[productId][size] * (productInfo?.price || 0);
                }
            } catch (error) {
                console.error(error);
            }
        }
        return totalAmount;
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
        getCartTotal,
        updateCartItem,
        getCartAmount,
        getUserCartData,
        navigate
    };
    return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
