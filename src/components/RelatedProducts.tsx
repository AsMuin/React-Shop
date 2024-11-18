import { ProductItem as ProductItemType } from '@/service/context/ShopContext';
import { useEffect, useState } from 'react';
import Title from './Title';
import ProductItem from './ProductItem';
import { useAppSelector } from '@/service/store';
import { getAllProducts } from '@/service/store/product';
import { shallowEqual } from 'react-redux';

export default function RelatedProducts({ category, subCategory }: { category: string; subCategory: string }) {
    // const { products } = useShopContext();
    const products = useAppSelector(getAllProducts, shallowEqual);
    const [related, setRelated] = useState<ProductItemType[]>([]);
    useEffect(() => {
        if (products.length) {
            const relatedProducts = products!.filter(product => product.category === category && product.subCategory === subCategory);
            setRelated(relatedProducts.slice(0, 5));
        }
    }, [category, subCategory, products]);
    return (
        <>
            <div className="my-24">
                <div className="py-2 text-center text-3xl">
                    <Title text1={'RELATED'} text2={'PRODUCTS'} />
                </div>
                <div className="grid grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {related.map((product, index) => (
                        <ProductItem key={index} id={product._id} name={product.name} price={product.price} image={product.image} />
                    ))}
                </div>
            </div>
        </>
    );
}
