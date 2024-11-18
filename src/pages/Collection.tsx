import { assets } from '@/assets/assets';
import ProductItem from '@/components/ProductItem';
import Title from '@/components/Title';
import { useShopContext } from '@/hook/context';
import { useAppSelector } from '@/service/store';
import { getAllProducts } from '@/service/store/product';
import { useEffect, useState } from 'react';
import { shallowEqual } from 'react-redux';

export default function Collection() {
    const {
        // products,
        search,
        showSearch
    } = useShopContext();
    const products = useAppSelector(getAllProducts, shallowEqual);
    console.log('products', products);

    const [showFilters, setShowFilters] = useState(false);
    const [filterProducts, setFilterProducts] = useState<typeof products>([]);
    const [category, setCategory] = useState<string[]>([]);
    const [subCategory, setSubCategory] = useState<string[]>([]);
    const [sortType, setSortType] = useState<string>('relevant');

    function toggleCategory(event: React.ChangeEvent<HTMLInputElement>) {
        if (category.includes(event.target.value)) {
            setCategory(category.filter(item => item !== event.target.value));
        } else {
            setCategory([...category, event.target.value]);
        }
    }
    function toggleSubCategory(event: React.ChangeEvent<HTMLInputElement>) {
        if (subCategory.includes(event.target.value)) {
            setSubCategory(subCategory.filter(item => item !== event.target.value));
        } else {
            setSubCategory([...subCategory, event.target.value]);
        }
    }
    useEffect(() => {
        let filteredProducts = products?.slice();
        if (showSearch && search) {
            filteredProducts = filteredProducts?.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
        }
        filteredProducts = filteredProducts?.filter(product => {
            if (category.length > 0 && !category.includes(product.category)) {
                return false;
            }
            if (subCategory.length > 0 && !subCategory.includes(product.subCategory)) {
                return false;
            }
            return true;
        });
        switch (sortType) {
            case 'low-high': {
                setFilterProducts([...filteredProducts!.sort((a, b) => a.price - b.price)]);
                break;
            }
            case 'high-low': {
                setFilterProducts([...filteredProducts!.sort((a, b) => b.price - a.price)]);
                break;
            }
            default: {
                setFilterProducts(filteredProducts);
                break;
            }
        }
    }, [category, subCategory, products, sortType, search, showSearch]);

    return (
        <>
            <div className="flex flex-col gap-1 border-t pt-10 sm:flex-row sm:gap-10">
                <div className="min-w-60">
                    <p onClick={() => setShowFilters(!showFilters)} className="my-2 flex cursor-pointer items-center gap-2 text-xl">
                        FILTERS
                        <img className={`h-3 sm:hidden ${showFilters ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
                    </p>
                    <div className={`mt-6 border border-gray-300 py-3 pl-5 ${showFilters ? '' : 'hidden'} sm:block`}>
                        <p className="mb-3 text-sm font-medium">用户人群</p>
                        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                            <p className="flex gap-2">
                                <input className="w-3" type="checkbox" value={'Men'} onChange={toggleCategory} />
                                男装
                            </p>
                            <p className="flex gap-2">
                                <input className="w-3" type="checkbox" value={'Women'} onChange={toggleCategory} />
                                女装
                            </p>
                            <p className="flex gap-2">
                                <input className="w-3" type="checkbox" value={'Kids'} onChange={toggleCategory} />
                                童装
                            </p>
                        </div>
                    </div>
                    <div className={`my-5 border border-gray-300 py-3 pl-5 ${showFilters ? '' : 'hidden'} sm:block`}>
                        <p className="mb-3 text-sm font-medium">服装类型</p>
                        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                            <p className="flex gap-2">
                                <input className="w-3" type="checkbox" value={'Topwear'} onChange={toggleSubCategory} />
                                上衣
                            </p>
                            <p className="flex gap-2">
                                <input className="w-3" type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} />
                                下装
                            </p>
                            <p className="flex gap-2">
                                <input className="w-3" type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} />
                                冬装
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1">
                <div className="mb-4 flex justify-between text-base sm:text-2xl">
                    <Title text1={'ALL'} text2={'COLLECTIONS'} />
                    <select onChange={event => setSortType(event.target.value)} className="border-2 border-gray-300 px-2 text-sm">
                        <option value="relevant">相关性：</option>
                        <option value="low-high">价格：低到高</option>
                        <option value="high-low">价格：高到低</option>
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4">
                    {filterProducts!.map(product => (
                        <ProductItem key={product._id} name={product.name} id={product._id} price={product.price} image={product.image} />
                    ))}
                </div>
            </div>
        </>
    );
}
