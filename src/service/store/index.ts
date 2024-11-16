import { configureStore } from '@reduxjs/toolkit';
import product from './product';
import cart from './cart';

const store = configureStore({
    reducer: {
        product,
        cart
    }
});
export default store;
