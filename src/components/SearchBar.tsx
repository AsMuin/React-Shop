import { assets } from '@/assets/assets';
import { useShopContext } from '@/hook/context';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function SearchBar() {
    const { search, setSearch, showSearch, setShowSearch } = useShopContext();
    const [visible, setVisible] = useState(false);
    const location = useLocation();
    useEffect(() => {
        if (location.pathname.includes('collection') && showSearch) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location, showSearch]);
    return (
        showSearch &&
        visible && (
            <>
                <div className="border-b border-t bg-gray-50 text-center">
                    <div className="mx-3 my-5 inline-flex w-3/4 items-center justify-center rounded-full border border-gray-400 px-5 py-2 sm:w-1/2">
                        <input
                            type="text"
                            placeholder="检索商品"
                            className="flex-1 bg-inherit text-sm outline-none"
                            value={search}
                            onChange={e => setSearch!(e.target.value)}
                        />
                        <img src={assets.search_icon} className="w-4" alt="" />
                    </div>
                    <img onClick={() => setShowSearch!(false)} src={assets.cross_icon} className="inline w-3 cursor-pointer" alt="" />
                </div>
            </>
        )
    );
}
