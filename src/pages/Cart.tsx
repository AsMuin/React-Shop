import { assets } from '@/assets/assets';
import CartTotal from '@/components/CartTotal';
import Title from '@/components/Title';
// import { SIZE_TYPE } from '@/service/context/ShopContext';
import { useShopContext } from '@/hook/context';
import { useAppSelector } from '@/service/store';
import { getAllProducts } from '@/service/store/product';
import { getAllCartItems, updateNumberInCartQuantity } from '@/service/store/cart';
// interface CartItem {
//     _id: string;
//     size: SIZE_TYPE;
//     quantity: number;
// }
export default function Cart() {
    const {
        dispatch,
        // products,
        currency,
        // cartItems,
        navigate
        // updateCartItem,
        // getUserCartData
    } = useShopContext();
    const products = useAppSelector(getAllProducts);
    // const [cartData, setCartData] = useState<CartItem[]>([]);
    const cartData = useAppSelector(getAllCartItems);
    // useEffect(() => {
    //     if (products.length > 0) {
    //         const cartDataCopy = [];
    //         for (const cartItem in cartItems) {
    //             for (const size in cartItems[cartItem]) {
    //                 cartDataCopy.push({
    //                     _id: cartItem,
    //                     size: size as SIZE_TYPE,
    //                     quantity: cartItems[cartItem][size as SIZE_TYPE] ?? 0
    //                 });
    //             }
    //         }
    //         setCartData(cartDataCopy);
    //     }
    // }, [cartItems, products]);
    return (
        <>
            <div className="border-t pt-14">
                <div className="mb-3 text-center">
                    <Title text1={'YOUR'} text2={'CART'} />
                </div>
                <div className="">
                    {cartData.map((cartItem, index) => {
                        const productData = products?.find(product => product._id === cartItem.productId);
                        return (
                            <div
                                key={index}
                                className="grid grid-cols-[4fr_0.5fr_0.5fr] items-center gap-4 border-b border-t py-4 text-gray-700 sm:grid-cols-[4fr_2fr_0.5fr]">
                                <div className="flex items-start gap-6">
                                    <img className="w-16 sm:w-20" src={productData?.image[0]} alt="" />
                                    <div>
                                        <p className="text-xs font-medium sm:text-lg">{productData?.name}</p>
                                        <div className="mt-2 flex items-center gap-5">
                                            <p>
                                                {currency}
                                                {productData?.price}
                                            </p>
                                            <p className="border bg-slate-50 px-2 sm:px-3 sm:py-1">{cartItem.size}</p>
                                        </div>
                                    </div>
                                </div>
                                <input
                                    onChange={e => {
                                        const value = parseInt(e.target.value);
                                        if (value) {
                                            dispatch(
                                                updateNumberInCartQuantity({ productId: cartItem.productId, size: cartItem.size, quantity: value })
                                            );
                                        }
                                    }}
                                    value={cartItem.quantity}
                                    className="max-w-10 border px-1 py-1 sm:max-w-20 sm:px-2"
                                    type="number"
                                    placeholder="购买数量"
                                />
                                <img
                                    onClick={() => {
                                        dispatch(updateNumberInCartQuantity({ productId: cartItem.productId, size: cartItem.size, quantity: 0 }));
                                    }}
                                    className="mr-4 w-4 cursor-pointer sm:w-5"
                                    src={assets.bin_icon}
                                    alt=""
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="my-20 flex justify-end">
                    <div className="w-full sm:w-[450px]">
                        <CartTotal />
                        <div className="w-full text-end">
                            <button onClick={() => navigate!('/placeOrder')} className="my-8 bg-black px-8 py-3 text-sm text-white">
                                结账
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
