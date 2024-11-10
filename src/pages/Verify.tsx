import { useShopContext } from '@/hook/context';
import { useSearchParams } from 'react-router-dom';

function Verify() {
    const { navigate, setCartItems } = useShopContext();
    const [serachParams, setSearchParams] = useSearchParams();
    const success = serachParams.get('success');
    const orderId = serachParams.get('orderId');
    async function verifyPayment() {}
    return (
        <>
            <div></div>
        </>
    );
}
export default Verify;
