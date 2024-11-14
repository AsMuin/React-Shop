import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import App from '@/App';
const router = createBrowserRouter([
    {
        path: '*',
        element: <App />,
        children: [
            {
                path: '',
                Component: lazy(() => import('@/pages/Home'))
            },
            {
                path: 'product/:productId',
                Component: lazy(() => import('@/pages/Product'))
            },
            {
                path: 'cart',
                Component: lazy(() => import('@/pages/Cart'))
            },
            {
                path: 'login',
                Component: lazy(() => import('@/pages/Login'))
            },
            {
                path: 'orders',
                Component: lazy(() => import('@/pages/Orders'))
            },
            {
                path: 'about',
                Component: lazy(() => import('@/pages/About'))
            },
            {
                path: 'placeOrder',
                Component: lazy(() => import('@/pages/PlaceOrder'))
            },
            {
                path: 'collection',
                Component: lazy(() => import('@/pages/Collection'))
            },
            {
                path: 'cart',
                Component: lazy(() => import('@/pages/Cart'))
            },
            {
                path: 'contact',
                Component: lazy(() => import('@/pages/Contact'))
            },
            {
                path: 'profile',
                Component: lazy(() => import('@/pages/Profile'))
            },
            {
                path: 'verify',
                Component: lazy(() => import('@/pages/Verify'))
            }
        ]
    }
]);

export default router;
