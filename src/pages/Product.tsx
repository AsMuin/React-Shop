import { useParams } from 'react-router-dom';

export default function Product() {
    const { productId } = useParams();
    console.log(productId);
    return (
        <>
            <div>Product</div>
        </>
    );
}
