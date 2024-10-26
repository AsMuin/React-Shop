import { useEffect, useState } from 'react';
import Title from './Title';
import ProductItem from '@/components/ProductItem';
import { useShopContext } from '@/hook/context';

export default function LatestCollection() {
    const { products } = useShopContext();
    const [latestProducts, setLatestProducts] = useState<typeof products>([]);
    useEffect(() => {
        setLatestProducts(products.slice(0, 10));
    }, [products]);
    return (
        <>
            <div className="my-10">
                <div className="text-center py-8 text-3xl">
                    <Title text1={'LATEST'} text2={'COLLECTION'}></Title>
                    <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the.
                    </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                    {latestProducts!.map((product, index) => (
                        <ProductItem key={index} id={product._id} image={product.image} name={product.name} price={product.price}></ProductItem>
                    ))}
                </div>
            </div>
        </>
    );
}
