import { postOrder } from '@/api/order';
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
                    break;
                }
                case 'razorpay': {
                    await postOrder(orderData);
                    break;
                }
                case 'stripe': {
                    await postOrder(orderData);
                    break;
                }
                default: {
                    break;
                }
            }
            setCartItems({});
            toast.success('下单成功');
            navigate('/orders');
            console.log(orderItemList);
        } catch (e) {
            console.error(e);
        }
    }
    return (
        <>
            <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
                <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                    <div className="text-xl sm:text-2xl my-3">
                        <Title text1="DELIVERY" text2="INFORMATION" />
                    </div>
                    <div className="flex gap-3">
                        <input
                            required
                            onChange={onChangeHandler}
                            name="firstName"
                            value={formData.firstName}
                            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                            type="text"
                            placeholder="First Name"
                        />
                        <input
                            required
                            onChange={onChangeHandler}
                            name="lastName"
                            value={formData.lastName}
                            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                            type="text"
                            placeholder="Last Name"
                        />
                    </div>
                    <input
                        required
                        onChange={onChangeHandler}
                        name="email"
                        value={formData.email}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="Email Address"
                    />
                    <input
                        required
                        onChange={onChangeHandler}
                        name="street"
                        value={formData.street}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="Street Address"
                    />
                    <input
                        required
                        onChange={onChangeHandler}
                        name="zipCode"
                        value={formData.zipCode}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="number"
                        placeholder="Zip Code"
                    />
                    <div className="flex flex-col gap-3">
                        <input
                            required
                            onChange={onChangeHandler}
                            name="city"
                            value={formData.city}
                            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                            type="text"
                            placeholder="City"
                        />
                        <input
                            required
                            onChange={onChangeHandler}
                            name="province"
                            value={formData.province}
                            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                            type="text"
                            placeholder="Province"
                        />
                    </div>
                    <input
                        required
                        onChange={onChangeHandler}
                        name="phone"
                        value={formData.phone}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
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
                        <div className="flex gap-3 flex-col lg:flex-row">
                            <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                                <p
                                    className={`min-w-3.5 h-3.5 border rounded-full 
                                    ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                                <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
                            </div>
                            <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                                <p
                                    className={`min-w-3.5 h-3.5 border rounded-full 
                                    ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                                <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
                            </div>
                            <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                                <p
                                    className={`min-w-3.5 h-3.5 border rounded-full 
                                    ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                                <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
                            </div>
                        </div>
                        <div className="w-full text-end mt-8">
                            <button type="submit" className="bg-black text-white px-16 py-3 text-sm">
                                PLACE ORDER
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
