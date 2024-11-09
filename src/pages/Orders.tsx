import { getUserCart } from '@/api/cart';
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
    const { products, currency } = useShopContext();
    const [orderData, setOrderData] = useState<IOderDataItem[]>([]);
    useEffect(() => {
        getOrderData();
    }, []);
    async function getOrderData() {
        try {
            const response = await getUserOrderList<API_OrderData[]>();
            console.log(response);
            if (response.success) {
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
            }
        } catch (e) {
            console.error(e);
        }
    }
    // getOrderData();
    return (
        <>
            <div className="border-t pt-16">
                <div className="text-2xl">
                    <Title text1="MY" text2="ORDERS"></Title>
                </div>
                <div className="">
                    {orderData.map((product, index) => (
                        <div key={index} className="py-4 border-t border-b text-gray-700 flex flex-row md:items-center md:justify-between gap-4">
                            <div className="flex items-start gap-6 text-sm">
                                <img className="w-16 sm:w-20" src={product.image[0]} alt="" />
                                <div>
                                    <p className="sm:text-base font-medium">{product.name}</p>
                                    <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                                        <p className="text-lg">
                                            {currency} {product.price}
                                        </p>
                                        <p>Quantity: {product.quantity ?? 0}</p>
                                        <p>Size:{product.size ?? ''}</p>
                                    </div>
                                    <p className="mt-2">
                                        Date: <span className="text-gray-400">25 ,Jul ,2024 </span>
                                    </p>
                                </div>
                            </div>
                            <div className="md:w-1/2 flex justify-between">
                                <div className="flex items-center gap-2">
                                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                                    <p className="text-sm md:text-base">Ready to ship</p>
                                </div>
                                <button className="border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
