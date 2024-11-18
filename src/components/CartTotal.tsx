import { useAppSelector } from '@/service/store';
import Title from './Title';
import { useShopContext } from '@/hook/context';
import { getAllProducts } from '@/service/store/product';
import { getAllCartItems } from '@/service/store/cart';
import { shallowEqual } from 'react-redux';

export default function CartTotal() {
    const {
        currency,
        delivery_fee
        // , getCartAmount
    } = useShopContext();
    const products = useAppSelector(getAllProducts, shallowEqual);
    const cartData = useAppSelector(getAllCartItems, shallowEqual);
    const cartTotal = cartData.reduce((acc, curr) => {
        const product = products.find(p => p._id === curr.productId);
        if (product) {
            return acc + product.price * curr.quantity;
        }
        return acc;
    }, 0);
    return cartTotal ? (
        <>
            <div className="w-full">
                <div className="text-2xl">
                    <Title text1="CART" text2="TOTAL" />
                </div>
                <div className="mt-2 flex flex-col gap-2 text-sm">
                    <div className="flex justify-between">
                        <p>小计</p>
                        <p>
                            {currency}
                            {cartTotal || 0}.00
                        </p>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                        <p>配送</p>
                        <p>
                            {currency}
                            {delivery_fee || 0}.00
                        </p>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                        <b>共计</b>
                        <b>
                            {currency}
                            {cartTotal + delivery_fee! || 0}.00
                        </b>
                    </div>
                </div>
            </div>
        </>
    ) : null;
}
