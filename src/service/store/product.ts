import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { getProductList } from '../api/product';
import { RootState } from '.';
export interface ProductItem {
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
const productAdapter = createEntityAdapter<ProductItem, string>({
    selectId: entity => entity._id // 指定使用 _id 作为唯一标识
});
const productSlice = createSlice({
    name: 'product',
    initialState: productAdapter.getInitialState(),
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchProductList.fulfilled, (state, action) => {
            productAdapter.upsertMany(state, action.payload ?? []);
        });
    }
});

export const fetchProductList = createAsyncThunk('product/fetchProductList', async (_, { signal }) => {
    try {
        console.log('store', signal);
        const response = await getProductList<ProductItem[]>({ signal });
        return response.data;
    } catch (e) {
        console.error(e);
    }
});

export const { selectAll: getAllProducts, selectById: selectProductById } = productAdapter.getSelectors((state: RootState) => state.product);
export default productSlice.reducer;
