import { assets } from '@/assets/assets';
import { useShopContext } from '@/hook/context';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
export default function Navbar() {
    const [visible, setVisible] = useState(false);
    const { setShowSearch, getCartTotal, navigate } = useShopContext();
    const links = [
        { name: 'Home', path: '/' },
        { name: 'Collection', path: '/collection' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' }
    ];
    return (
        <>
            <div className="flex items-center justify-between py-5 font-medium">
                <Link to="/">
                    <img src={assets.logo} className="w-36" alt="" />
                </Link>
                <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
                    {links.map(link => (
                        <NavLink key={link.name} to={link.path} className="flex flex-col items-center gap-1 ">
                            <p>{link.name}</p>
                            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                        </NavLink>
                    ))}
                </ul>
                <div className="flex items-center gap-6">
                    <img onClick={() => setShowSearch!(true)} src={assets.search_icon} className="w-5 cursor-pointer" alt="search" />
                    <div className="group relative">
                        <Link to={'/login'}>
                            <img src={assets.profile_icon} alt="profile" className="w-5 cursor-pointer" />
                        </Link>
                        <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                                <p className="cursor-pointer hover:text-black">My Profile</p>
                                <p onClick={() => navigate('/placeOrder')} className="cursor-pointer hover:text-black">
                                    Orders
                                </p>
                                <p className="cursor-pointer hover:text-black">Logout</p>
                            </div>
                        </div>
                    </div>
                    <Link to="/cart" className="relative">
                        <img src={assets.cart_icon} className="w-5 min-w-5" alt="cart" />
                        <p className="absolute right-[-5px] bottom-[-5px] w-4  text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
                            {getCartTotal!()}
                        </p>
                    </Link>
                    <img onClick={() => setVisible(true)} src={assets.menu_icon} className="w-5 cursor-pointer sm:hidden" alt="" />
                </div>
                <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                    <div className="flex flex-col text-gray-600 cursor-pointer">
                        <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3">
                            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
                            <p>Back</p>
                        </div>
                        {links.map(link => (
                            <NavLink key={link.name} onClick={() => setVisible(false)} to={link.path} className="py-2 pl-6 border">
                                {link.name}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
