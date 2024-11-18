import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProductList } from '@/service/store/product';
import { useAppDispatch, useAppSelector } from '../store';
import { getUserCartData } from '../store/cart';
import { fetchUserInfo, getUserInfo } from '../store/user';
import { shallowEqual } from 'react-redux';
export type SIZE_TYPE = 'S' | 'M' | 'L' | 'XL' | 'XXL';
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
export interface CartData {
    [key: string]: {
        [key in SIZE_TYPE]: number;
    };
}
export const ShopContext = createContext<
    | {
          dispatch: ReturnType<typeof useAppDispatch>;
          currency: string;
          delivery_fee: number;
          search: string;
          setSearch: React.Dispatch<React.SetStateAction<string>>;
          showSearch: boolean;
          setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
          navigate: ReturnType<typeof useNavigate>;
      }
    | undefined
>(undefined);

const ShopContextProvider = function (props: { children: React.ReactNode }) {
    const currency = '￥';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userInfo = useAppSelector(getUserInfo, shallowEqual);
    useEffect(() => {
        dispatch(fetchProductList()).then(() => {
            if (localStorage.getItem('token')) {
                dispatch(getUserCartData());
            }
        });
    }, [dispatch]);

    useEffect(() => {
        if (userInfo.email === '' && userInfo.name === '' && localStorage.getItem('token')) {
            dispatch(fetchUserInfo());
        }
    }, [userInfo, dispatch]);

    const value = {
        dispatch,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        getUserCartData,
        navigate
    };
    return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
