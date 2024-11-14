import { postOrder, stripeOrder } from '@/api/order';
import { assets } from '@/assets/assets';
import CartTotal from '@/components/CartTotal';
import Title from '@/components/Title';
import { SIZE_TYPE } from '@/context/ShopContext';
import { useShopContext } from '@/hook/context';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function PlaceOrder() {
    const [method, setMethod] = useState('cod');
    const { navigate, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useShopContext();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        province: '',
        zipCode: '',
        phone: ''
    });
    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
    async function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(formData);
        try {
            const orderItemList = [];
            for (const cartItem in cartItems) {
                for (const size in cartItems[cartItem]) {
                    if (cartItems[cartItem][size as SIZE_TYPE] > 0) {
                        const itemInfo = products.find(product => product._id === cartItem);
                        if (itemInfo) {
                            const orderItem = { ...itemInfo, size, quantity: cartItems[cartItem][size as SIZE_TYPE] };
                            orderItemList.push(orderItem);
                        }
                    }
                }
            }
            const orderData = {
                address: formData,
                items: orderItemList,
                amount: getCartAmount() + delivery_fee
            };
            switch (method) {
                case 'cod': {
                    await postOrder(orderData);
                    toast.success('下单成功');
                    navigate('/orders');
                    setCartItems({});
                    break;
                }
                case 'stripe': {
                    const responseStripe = await stripeOrder<string>(orderData);
                    console.log(responseStripe);
                    toast.success('下单成功,即将跳转支付页面');
                    setTimeout(() => {
                        window.location.replace(responseStripe.data!);
                    }, 2500);
                    break;
                }
                default: {
                    break;
                }
            }
            console.log(orderItemList);
        } catch (e) {
            console.error(e);
        }
    }
    return (
        <>
            <form onSubmit={onSubmitHandler} className="flex min-h-[80vh] flex-col justify-between gap-4 border-t pt-5 sm:flex-row sm:pt-14">
                <div className="flex w-full flex-col gap-4 sm:max-w-[480px]">
                    <div className="my-3 text-xl sm:text-2xl">
                        <Title text1="DELIVERY" text2="INFORMATION" />
                    </div>
                    <div className="flex gap-3">
                        <input
                            required
                            onChange={onChangeHandler}
                            name="firstName"
                            value={formData.firstName}
                            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
                            type="text"
                            placeholder="First Name"
                        />
                        <input
                            required
                            onChange={onChangeHandler}
                            name="lastName"
                            value={formData.lastName}
                            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
                            type="text"
                            placeholder="Last Name"
                        />
                    </div>
                    <input
                        required
                        onChange={onChangeHandler}
                        name="email"
                        value={formData.email}
                        className="w-full rounded border border-gray-300 px-3.5 py-1.5"
                        type="text"
                        placeholder="Email Address"
                    />
                    <input
                        required
                        onChange={onChangeHandler}
                        name="street"
                        value={formData.street}
                        className="w-full rounded border border-gray-300 px-3.5 py-1.5"
                        type="text"
                        placeholder="Street Address"
                    />
                    <input
                        required
                        onChange={onChangeHandler}
                        name="zipCode"
                        value={formData.zipCode}
                        className="w-full rounded border border-gray-300 px-3.5 py-1.5"
                        type="number"
                        placeholder="Zip Code"
                    />
                    <div className="flex flex-col gap-3">
                        <input
                            required
                            onChange={onChangeHandler}
                            name="city"
                            value={formData.city}
                            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
                            type="text"
                            placeholder="City"
                        />
                        <input
                            required
                            onChange={onChangeHandler}
                            name="province"
                            value={formData.province}
                            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
                            type="text"
                            placeholder="Province"
                        />
                    </div>
                    <input
                        required
                        onChange={onChangeHandler}
                        name="phone"
                        value={formData.phone}
                        className="w-full rounded border border-gray-300 px-3.5 py-1.5"
                        type="number"
                        placeholder="Phone Number"
                    />
                </div>
                <div className="mt-8">
                    <div className="mt-8 min-w-80">
                        <CartTotal />
                    </div>
                    <div className="mt-12">
                        <Title text1="PAYMENT" text2="METHOD" />
                        <div className="flex flex-col gap-3 lg:flex-row">
                            <div onClick={() => setMethod('stripe')} className="flex cursor-pointer items-center gap-3 border p-2 px-3">
                                <p className={`h-3.5 min-w-3.5 rounded-full border ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                                <img className="mx-4 h-5" src={assets.stripe_logo} alt="" />
                            </div>
                            <div onClick={() => setMethod('cod')} className="flex cursor-pointer items-center gap-3 border p-2 px-3">
                                <p className={`h-3.5 min-w-3.5 rounded-full border ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                                <p className="mx-4 text-sm font-medium text-gray-500">现金支付</p>
                            </div>
                        </div>
                        <div className="mt-8 w-full text-end">
                            <button type="submit" className="bg-black px-16 py-3 text-sm text-white">
                                PLACE ORDER
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
