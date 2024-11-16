import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
export type SIZE_TYPE = 'S' | 'M' | 'L' | 'XL' | 'XXL';
interface CartItem {
    id: string;
    _id: string;
    size: SIZE_TYPE;
    quantity: number;
}
export interface CartData {
    [key: string]: {
        [key in SIZE_TYPE]: number;
    };
}
const cartAdapter = createEntityAdapter<CartItem>();
const cartSlice = createSlice({
    name: 'cart',
    initialState: cartAdapter.getInitialState(),
    reducers: {}
});
export default cartSlice.reducer;
