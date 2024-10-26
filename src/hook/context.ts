import { ShopContext } from '@/context/ShopContext';
import { useContext } from 'react';
export const useShopContext = () => {
    const shopContextInfo = useContext(ShopContext);
    if (!shopContextInfo) {
        throw new Error('ShopContext Provider not found');
    }
    return shopContextInfo;
};
