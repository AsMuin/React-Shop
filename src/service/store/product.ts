import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
export interface ProductItem {
    id: string;
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string[];
    category: string;
    subCategory: string;
    sizes: string[];
    date: number;
    bestseller: boolean;
}
const productAdapter = createEntityAdapter<ProductItem>();
const productSlice = createSlice({
    name: 'product',
    initialState: productAdapter.getInitialState(),
    reducers: {}
});

export default productSlice.reducer;
