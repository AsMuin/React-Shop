import Title from './Title';
import { useShopContext } from '@/hook/context';

export default function CartTotal() {
    const { currency, delivery_fee, getCartAmount } = useShopContext();

    return getCartAmount!() ? (
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
                            {getCartAmount!() || 0}.00
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
                            {getCartAmount!() + delivery_fee! || 0}.00
                        </b>
                    </div>
                </div>
            </div>
        </>
    ) : null;
}
