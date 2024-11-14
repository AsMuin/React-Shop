import { assets } from '@/assets/assets';
import { useShopContext } from '@/hook/context';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
export default function Navbar() {
    const [visible, setVisible] = useState(false);
    const { setShowSearch, getCartTotal, navigate, setCartItems } = useShopContext();
    const links = [
        { name: '首页', path: '/' },
        { name: '商品', path: '/collection' },
        { name: '关于我们', path: '/about' },
        { name: '加入我们', path: '/contact' }
    ];
    function logoutORlogin() {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
            setCartItems({});
        }
        navigate('/login');
    }
    function handleSearch() {
        setShowSearch(true);
        navigate('/collection');
    }
    return (
        <>
            <div className="flex items-center justify-between py-5 font-medium">
                <Link to="/">
                    <img src={assets.logo} className="w-36" alt="" />
                </Link>
                <ul className="hidden gap-5 text-sm text-gray-700 sm:flex">
                    {links.map(link => (
                        <NavLink key={link.name} to={link.path} className="flex flex-col items-center gap-1">
                            <p>{link.name}</p>
                            <hr className="hidden h-[1.5px] w-2/4 border-none bg-gray-700" />
                        </NavLink>
                    ))}
                </ul>
                <div className="flex items-center gap-6">
                    <img onClick={handleSearch} src={assets.search_icon} className="w-5 cursor-pointer" alt="search" />
                    <div className="group relative">
                        <img src={assets.profile_icon} alt="profile" className="w-5 cursor-pointer" />
                        <div className="dropdown-menu absolute right-0 hidden pt-4 group-hover:block">
                            <div className="flex w-36 flex-col gap-2 rounded bg-slate-100 px-5 py-3 text-gray-500">
                                <p onClick={()=>navigate('/profile')} className={`cursor-pointer hover:text-black ${localStorage.getItem('token')? '':'hidden'}`}>个人详情</p>
                                <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black">
                                    订单详情
                                </p>
                                <p onClick={logoutORlogin} className={`cursor-pointer hover:text-black`}>
                                    {localStorage.getItem('token') ? '登出' : '登录'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <Link to="/cart" className="relative">
                        <img src={assets.cart_icon} className="w-5 min-w-5" alt="cart" />
                        <p className="absolute bottom-[-5px] right-[-5px] aspect-square w-4 rounded-full bg-black text-center text-[8px] leading-4 text-white">
                            {getCartTotal!()}
                        </p>
                    </Link>
                    <img onClick={()=>setVisible(true)} src={assets.menu_icon} className="w-5 cursor-pointer sm:hidden" alt="" />
                </div>
                <div className={`absolute bottom-0 right-0 top-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                    <div className="flex cursor-pointer flex-col text-gray-600">
                        <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3">
                            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
                        </div>
                        {links.map(link => (
                            <NavLink key={link.name} onClick={() => setVisible(false)} to={link.path} className="border py-2 pl-6">
                                {link.name}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
