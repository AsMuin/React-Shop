import { assets } from '@/assets/assets';
import RelatedProducts from '@/components/RelatedProducts';
import { ProductItem } from '@/service/context/ShopContext';
import { useShopContext } from '@/hook/context';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '@/service/store';
import { getAllProducts } from '@/service/store/product';
import { addToCart, SIZE_TYPE } from '@/service/store/cart';
import { toast } from 'react-toastify';
import { shallowEqual } from 'react-redux';
export default function Product() {
    const { productId } = useParams();
    const {
        dispatch,
        // products,
        currency
        // addToCart
    } = useShopContext();
    const products = useAppSelector(getAllProducts, shallowEqual);
    const [productData, setProductData] = useState<ProductItem | null>(null);
    const [image, setImage] = useState('');
    const [selectSize, setSelectSize] = useState('');
    useEffect(() => {
        if (productId) {
            const product = products?.find(product => product._id === productId);
            if (product) {
                setProductData(product);
                setImage(product.image[0]);
            }
        }
    }, [productId, products]);
    async function handleAddToCart() {
        try {
            await dispatch(addToCart!({ productId: productData!._id, size: selectSize as SIZE_TYPE }));
            toast.success('添加商品成功');
        } catch (e) {
            console.error(e);
        }
    }
    return productData ? (
        <>
            <div className="border-t-2 pt-10 opacity-100 transition-opacity duration-500 ease-in">
                <div className="flex flex-col gap-12 sm:flex-row sm:gap-12">
                    <div className="gap3 flex flex-1 flex-col-reverse sm:flex-row">
                        <div className="mr-2 flex w-full justify-between overflow-x-auto sm:w-[18.7%] sm:flex-col sm:justify-normal sm:overflow-y-scroll">
                            {productData.image.map((image, index) => (
                                <img
                                    onClick={() => setImage(image)}
                                    src={image}
                                    key={index}
                                    className="w-[24%] flex-shrink-0 cursor-pointer sm:mb-3 sm:w-full"
                                    alt=""
                                />
                            ))}
                        </div>
                        <div className="w-full sm:w-[80%]">
                            <img src={image} className="h-auto w-full" alt="" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h1 className="mt-2 text-2xl font-medium">{productData.name}</h1>
                        <div className="mt-2 flex items-center gap-1">
                            <img src={assets.star_icon} alt="" />
                            <img src={assets.star_icon} alt="" />
                            <img src={assets.star_icon} alt="" />
                            <img src={assets.star_icon} alt="" />
                            <img src={assets.star_dull_icon} alt="" />
                            <p className="pl-2">123</p>
                        </div>
                        <p className="mt-5 text-3xl font-medium">
                            {currency}
                            {productData.price}
                        </p>
                        <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
                        <div className="my-8 flex flex-col gap-4">
                            <p>Select Size</p>
                            <div className="flex gap-2">
                                {productData.sizes.map((size, index) => (
                                    <button
                                        onClick={() => setSelectSize(size)}
                                        className={`border bg-gray-100 px-4 py-2 ${selectSize === size ? 'border-orange-500' : ''}`}
                                        key={index}>
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button onClick={handleAddToCart} className="bg-black px-8 py-3 text-sm text-white active:bg-gray-700">
                            ADD TO CART
                        </button>
                        <hr className="mt-8 sm:w-4/5" />
                        <div className="mt-5 flex flex-col gap-1 text-sm text-gray-500">
                            <p>100% Original product</p>
                            <p>Cash on delivery is available on this product</p>
                            <p>Easy return and exchange policy within 7 days</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-20">
                <div className="flex">
                    <b className="border px-5 py-3 text-sm">Description</b>
                    <p className="border px-5 py-3 text-sm">Reviews (123)</p>
                </div>
                <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet,
                        adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod
                    </p>
                    <p>
                        Mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis
                        arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra
                        tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent bland
                    </p>
                </div>
            </div>
            <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
        </>
    ) : (
        <>
            <div className="opacity-0"></div>
        </>
    );
}
