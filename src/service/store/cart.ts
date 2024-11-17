import { addProductToCart, getUserCart } from '@/api/cart';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
export type SIZE_TYPE = 'S' | 'M' | 'L' | 'XL' | 'XXL';
interface CartItem {
    id: string;
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
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getUserCartData.fulfilled, (state, action) => {
                const cartDataCopy = [];
                for (const productItem in action.payload) {
                    for (const size in action.payload[productItem]) {
                        cartDataCopy.push({
                            id: productItem,
                            size: size as SIZE_TYPE,
                            quantity: action.payload[productItem][size as SIZE_TYPE] ?? 0
                        });
                    }
                }
                cartAdapter.setAll(state, cartDataCopy);
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                const { productId, size } = action.payload!;
                const existingItem = state.entities[productId];
                if (existingItem) {
                    cartAdapter.updateOne(state, {
                        id: existingItem.id,
                        changes: { quantity: existingItem.quantity + 1 }
                    });
                } else {
                    cartAdapter.addOne(state, {
                        id: productId,
                        size,
                        quantity: 1
                    });
                }
            });
    }
});

export const getUserCartData = createAsyncThunk('/cart/getUserCartData', async () => {
    try {
        const response = await getUserCart<CartData>();
        return response.data;
    } catch (e) {
        console.error(e);
    }
});
export const addToCart = createAsyncThunk('/cart/addToCart', async ({ productId, size }: { productId: string; size: SIZE_TYPE }) => {
    try {
        await addProductToCart({ productId, size });
        return { productId, size };
    } catch (e) {
        console.error(e);
    }
});
export default cartSlice.reducer;
