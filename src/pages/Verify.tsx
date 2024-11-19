import { verifyStripe } from '@/service/api/order';
import { useShopContext } from '@/hook/context';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { removeAll } from '@/service/store/cart';

function Verify() {
    const { dispatch, navigate } = useShopContext();
    const [searchParams] = useSearchParams();
    const success = searchParams.get('success') === 'true';
    const orderId = searchParams.get('orderId')!;
    useEffect(() => {
        verifyPayment();
    }, []);
    console.log(success, orderId);
    async function verifyPayment() {
        try {
            await verifyStripe({ orderId, success });
            await dispatch(removeAll());
            navigate('/orders');
            toast.success('支付成功，可查看订单详情');
        } catch (e) {
            console.error(e);
            navigate('/cart');
        }
    }
    return (
        <>
            <div></div>
        </>
    );
}
export default Verify;
