import { assets } from '@/assets/assets';
import ProductItem from '@/components/ProductItem';
import Title from '@/components/Title';
import { useShopContext } from '@/hook/context';
import { useEffect, useState } from 'react';

export default function Collection() {
    const { products, search, showSearch } = useShopContext();
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
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
                <div className="min-w-60">
                    <p onClick={() => setShowFilters(!showFilters)} className="my-2 text-xl flex items-center cursor-pointer gap-2">
                        FILTERS
                        <img className={`h-3 sm:hidden ${showFilters ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
                    </p>
                    <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilters ? '' : 'hidden'} sm:block`}>
                        <p className="mb-3 text-sm font-medium ">CATEGORIES</p>
                        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                            <p className="flex gap-2">
                                <input className="w-3" type="checkbox" value={'Men'} onChange={toggleCategory} />
                                Men
                            </p>
                            <p className="flex gap-2">
                                <input className="w-3" type="checkbox" value={'Women'} onChange={toggleCategory} />
                                Women
                            </p>
                            <p className="flex gap-2">
                                <input className="w-3" type="checkbox" value={'Kids'} onChange={toggleCategory} />
                                Kids
                            </p>
                        </div>
                    </div>
                    <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilters ? '' : 'hidden'} sm:block`}>
                        <p className="mb-3 text-sm font-medium ">TYPE</p>
                        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                            <p className="flex gap-2">
                                <input className="w-3" type="checkbox" value={'Topwear'} onChange={toggleSubCategory} />
                                Topwear
                            </p>
                            <p className="flex gap-2">
                                <input className="w-3" type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} />
                                Bottomwear
                            </p>
                            <p className="flex gap-2">
                                <input className="w-3" type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} />
                                Winterwear
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 ">
                <div className="flex justify-between text-base sm:text-2xl mb-4">
                    <Title text1={'ALL'} text2={'COLLECTIONS'} />
                    <select onChange={event => setSortType(event.target.value)} className="border-2 border-gray-300 text-sm px-2">
                        <option value="relevant">Sort by: Relevance</option>
                        <option value="low-high">Sort by: Price: Low to High</option>
                        <option value="high-low">Sort by: Price: High to Low</option>
                    </select>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                    {filterProducts!.map(product => (
                        <ProductItem key={product._id} name={product.name} id={product._id} price={product.price} image={product.image} />
                    ))}
                </div>
            </div>
        </>
    );
}
