import { useEffect, useState } from 'react';
import Title from './Title';
import ProductItem from './ProductItem';
// import { useShopContext } from '@/hook/context';
import { useAppSelector } from '@/service/store';
import { getAllProducts } from '@/service/store/product';
import { shallowEqual } from 'react-redux';

export default function BestSeller() {
    // const { products } = useShopContext();
    const products = useAppSelector(getAllProducts,shallowEqual);
    const [bestSeller, setBestSeller] = useState<typeof products>([]);
    useEffect(() => {
        const bestProduct = products!.filter(product => product.bestseller);
        setBestSeller(bestProduct.slice(0, 5));
    }, [products]);
    return (
        <>
            <div className="my-10">
                <div className="py-8 text-center text-3xl">
                    <Title text1={'BEST'} text2={'SELLERS'}></Title>
                    <p className="m-auto w-3/4 text-xs text-gray-600 sm:text-sm md:text-base">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {bestSeller?.map((item, index) => (
                        <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image}></ProductItem>
                    ))}
                </div>
            </div>
        </>
    );
}
