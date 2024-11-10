import { useShopContext } from '@/hook/context';
import { Link } from 'react-router-dom';

export default function ProductItem({ id, name, price, image }: { id: string; name: string; price: number; image: string[] }) {
    const { currency } = useShopContext();
    return (
        <>
            <Link className="cursor-pointer text-gray-700" to={`/product/${id}`}>
                <div className="overflow-hidden">
                    <img className="transition ease-in-out hover:scale-110" src={image[0]} alt="" />
                </div>
                <p className="pb-1 pt-3 text-sm">{name}</p>
                <p className="text-sm font-medium">
                    {currency} {price}
                </p>
            </Link>
        </>
    );
}
