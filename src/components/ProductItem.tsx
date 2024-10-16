import { ShopContext } from '@/context/ShopContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

export default function ProductItem({ id, name, price, image }: { id: string; name: string; price: number; image: string[] }) {
    const { currency } = useContext(ShopContext);
    return (
        <>
            <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
                <div className="overflow-hidden ">
                    <img className="hover:scale-110 transition ease-in-out" src={image[0]} alt="" />
                </div>
                <p className="pt-3 pb-1 text-sm">{name}</p>
                <p className="text-sm font-medium">
                    {currency} {price}
                </p>
            </Link>
        </>
    );
}