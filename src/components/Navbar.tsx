import { assets } from '@/assets/assets';
import { NavLink } from 'react-router-dom';
export default function Navbar() {
    const links = [
        { name: 'Home', path: '/' },
        { name: 'Collection', path: '/collection' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' }
    ];
    return (
        <>
            <div className="flex items-center justify-between py-5 font-medium">
                <img src={assets.logo} className="w-36" alt="" />
                <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
                    {links.map(link => (
                        <NavLink
                            to={link.path}
                            className="flex flex-col items-center gap-1 ">
                            <p>{link.name}</p>
                            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                        </NavLink>
                    ))}
                </ul>
                <div className="flex items-center gap-6"></div>
            </div>
        </>
    );
}
