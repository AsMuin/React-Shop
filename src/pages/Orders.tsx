import { getUserOrderList } from '@/api/order';
import Title from '@/components/Title';
import { useShopContext } from '@/hook/context';
import { useEffect, useState } from 'react';
interface API_OrderItem {
    _id: string;
    name: string;
    price: number;
    image: string[];
    quantity: number;
    size: string[];
    date: number;
    bestSeller: boolean;
    description: string;
    category: string;
    subCategory: string;
}
interface API_OrderData {
    _id: string;
    items: API_OrderItem[];
    status: string;
    payment: boolean;
    paymentMethod: string;
}
interface IOderDataItem extends API_OrderItem {
    status: string;
    payment: boolean;
    paymentMethod: string;
}
export default function Orders() {
    const { currency } = useShopContext();
    const [orderData, setOrderData] = useState<IOderDataItem[]>([]);
    useEffect(() => {
        getOrderData();
    }, []);
    async function getOrderData() {
        try {
            const response = await getUserOrderList<API_OrderData[]>();
            console.log(response);
            const newOrderData = response.data!.flatMap(order =>
                order.items.map(item => ({
                    ...item,
                    status: order.status,
                    payment: order.payment,
                    paymentMethod: order.paymentMethod
                }))
            );
            console.log(newOrderData);
            setOrderData(newOrderData);
        } catch (e) {
            console.error(e);
        }
    }
    return (
        <>
            <div className="border-t pt-16">
                <div className="text-2xl">
                    <Title text1="MY" text2="ORDERS"></Title>
                </div>
                <div className="">
                    {orderData.map((product, index) => (
                        <div key={index} className="flex flex-row gap-4 border-b border-t py-4 text-gray-700 md:items-center md:justify-between">
                            <div className="flex items-start gap-6 text-sm">
                                <img className="w-16 sm:w-20" src={product.image[0]} alt="" />
                                <div>
                                    <p className="font-medium sm:text-base">{product.name}</p>
                                    <div className="mt-1 flex items-center gap-3 text-base text-gray-700">
                                        <p>
                                            {currency} {product.price}
                                        </p>
                                        <p>Quantity: {product.quantity ?? 0}</p>
                                        <p>Size:{product.size ?? ''}</p>
                                    </div>
                                    <p className="mt-1">
                                        Date: <span className="text-gray-400">{new Date(product.date).toDateString()}</span>
                                    </p>
                                    <p className="mt-1">
                                        Payment: <span className="text-gray-400">{product.paymentMethod}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-between md:w-1/2">
                                <div className="flex items-center gap-2">
                                    <p className="h-2 min-w-2 rounded-full bg-green-500"></p>
                                    <p className="text-sm md:text-base">{product.status}</p>
                                </div>
                                <button onClick={getOrderData} className="rounded-sm border px-4 py-2 text-sm font-medium">
                                    Track Order
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
