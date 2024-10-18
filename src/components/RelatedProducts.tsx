import { ProductItem as ProductItemType, ShopContext } from '@/context/ShopContext';
import { useContext, useEffect, useState } from 'react';
import Title from './Title';
import ProductItem from './ProductItem';

export default function RelatedProducts({ category, subCategory }: { category: string; subCategory: string }) {
    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState<ProductItemType[]>([]);
    useEffect(() => {
        if (products!.length) {
            const relatedProducts = products!.filter(product => product.category === category && product.subCategory === subCategory);
            setRelated(relatedProducts.slice(0, 5));
        }
    }, [category, subCategory, products]);
    return (
        <>
            <div className="my-24">
                <div className="text-center text-3xl py-2">
                    <Title text1={'RELATED'} text2={'PRODUCTS'} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                    {related.map((product, index) => (
                        <ProductItem key={index} id={product._id} name={product.name} price={product.price} image={product.image} />
                    ))}
                </div>
            </div>
        </>
    );
}
