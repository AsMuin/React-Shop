import { assets } from '@/assets/assets';
import CartTotal from '@/components/CartTotal';
import Title from '@/components/Title';
import { ShopContext } from '@/context/ShopContext';
import { useContext, useEffect, useState } from 'react';
interface CartItem {
    _id: string;
    size: string;
    quantity: number;
}
export default function Cart() {
    const { products, currency, cartItems, navigate, updateCartItem } = useContext(ShopContext);
    const [cartData, setCartData] = useState<CartItem[]>([]);
    useEffect(() => {
        const cartDataCopy = [];
        for (const cartItem in cartItems) {
            for (const size in cartItems[cartItem]) {
                cartDataCopy.push({
                    _id: cartItem,
                    size,
                    quantity: cartItems[cartItem][size]
                });
            }
        }
        console.log(cartDataCopy);
        setCartData(cartDataCopy);
    }, [cartItems]);
    return (
        <>
            <div className="border-t pt-14">
                <div className="text-center mb-3">
                    <Title text1={'YOUR'} text2={'CART'} />
                </div>
                <div className="">
                    {cartData.map((cartItem, index) => {
                        const productData = products?.find(product => product._id === cartItem._id);
                        return (
                            <div
                                key={index}
                                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                                <div className="flex items-start gap-6">
                                    <img className="w-16 sm:w-20" src={productData?.image[0]} alt="" />
                                    <div>
                                        <p className="text-xs sm:text-lg font-medium">{productData?.name}</p>
                                        <div className="flex items-center gap-5 mt-2">
                                            <p>
                                                {currency}
                                                {productData?.price}
                                            </p>
                                            <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{cartItem.size}</p>
                                        </div>
                                    </div>
                                </div>
                                <input
                                    onChange={e => {
                                        const value = parseInt(e.target.value);
                                        if (value) {
                                            updateCartItem!(cartItem._id, cartItem.size, value);
                                        }
                                    }}
                                    value={cartItem.quantity}
                                    className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 "
                                    type="number"
                                />
                                <img
                                    onClick={() => {
                                        updateCartItem!(cartItem._id, cartItem.size, 0);
                                    }}
                                    className="w-4 mr-4 sm:w-5 cursor-pointer"
                                    src={assets.bin_icon}
                                    alt=""
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="flex justify-end my-20">
                    <div className="w-full sm:w-[450px]">
                        <CartTotal />
                        <div className="w-full text-end">
                            <button onClick={() => navigate!('/place-order')} className="bg-black text-white text-sm my-8 py-3 px-8">
                                PROCEED TP CHECKOUT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
