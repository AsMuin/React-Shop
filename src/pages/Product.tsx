import { assets } from '@/assets/assets';
import { ShopContext, ProductItem } from '@/context/ShopContext';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
export default function Product() {
    const { productId } = useParams();
    const { products, currency } = useContext(ShopContext);
    const [productData, setProductData] = useState<ProductItem | null>(null);
    const [image, setImage] = useState('');
    const [selectSize, setSelectSize] = useState('');
    useEffect(() => {
        if (productId) {
            const product = products?.find(product => product._id === productId);
            if (product) {
                console.log(product);
                setProductData(product);
                setImage(product.image[0]);
            }
        }
    }, [productId, products]);
    console.log(productId);
    return productData ? (
        <>
            <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
                <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
                    <div className="flex-1 flex flex-col-reverse gap3 sm:flex-row">
                        <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full mr-2">
                            {productData.image.map((image, index) => (
                                <img
                                    onClick={() => setImage(image)}
                                    src={image}
                                    key={index}
                                    className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                                    alt=""
                                />
                            ))}
                        </div>
                        <div className="w-full sm:w-[80%]">
                            <img src={image} className="w-full h-auto" alt="" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
                        <div className="flex items-center gap-1 mt-2">
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
                        <div className="flex flex-col gap-4 my-8">
                            <p>Select Size</p>
                            <div className="flex gap-2">
                                {productData.sizes.map((size, index) => (
                                    <button
                                        onClick={() => setSelectSize(size)}
                                        className={`border py-2 px-4 bg-gray-100 ${selectSize === size ? 'border-orange-500' : ''}`}
                                        key={index}>
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">ADD TO CART</button>
                        <hr className="mt-8 sm:w-4/5" />
                        <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                            <p>100% Original product</p>
                            <p>Cash on delivery is available on this product</p>
                            <p>Easy return and exchange policy within 7 days</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-20">
                <div className="flex ">
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
        </>
    ) : (
        <>
            <div className="opacity-0"></div>
        </>
    );
}
