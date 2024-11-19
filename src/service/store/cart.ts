import { addProductToCart, getUserCart, updateQuantity } from '@/service/api/cart';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '.';
export type SIZE_TYPE = 'S' | 'M' | 'L' | 'XL' | 'XXL';
interface CartItem {
    id: string;
    productId: string;
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
    initialState: cartAdapter.getInitialState({
        amount: 0
    }),
    reducers: {
        removeAll(state) {
            cartAdapter.removeAll(state);
            state.amount = 0;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getUserCartData.fulfilled, (state, action) => {
                const cartDataCopy = [];
                let amount = 0;
                for (const productItem in action.payload) {
                    for (const size in action.payload[productItem]) {
                        amount += action.payload[productItem][size as SIZE_TYPE] ?? 0;
                        cartDataCopy.push({
                            id: productItem + size,
                            productId: productItem,
                            size: size as SIZE_TYPE,
                            quantity: action.payload[productItem][size as SIZE_TYPE] ?? 0
                        });
                    }
                }
                cartAdapter.setAll(state, cartDataCopy);
                state.amount = amount;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                if (action.payload?.productId && action.payload?.size) {
                    const { productId, size } = action.payload;
                    const existingItem = state.entities[productId];
                    if (existingItem) {
                        cartAdapter.updateOne(state, {
                            id: existingItem.id + size,
                            changes: { quantity: existingItem.quantity + 1 }
                        });
                    } else {
                        cartAdapter.addOne(state, {
                            id: productId + size,
                            productId,
                            size,
                            quantity: 1
                        });
                    }
                    state.amount += 1;
                }
            })
            .addCase(updateNumberInCartQuantity.fulfilled, (state, action) => {
                if (action.payload?.productId && action.payload?.size && action.payload?.quantity >= 0) {
                    const { productId, size, quantity } = action.payload;
                    if (quantity > 0) {
                        cartAdapter.updateOne(state, {
                            id: productId + size,
                            changes: { size, quantity }
                        });
                    } else if (quantity === 0) {
                        cartAdapter.removeOne(state, productId + size);
                    }
                    state.amount = Object.values(state.entities).reduce((acc, item) => acc + item.quantity, 0);
                }
            });
    }
});

export const getUserCartData = createAsyncThunk('cart/getUserCartData', async (_,{signal}) => {
    try {
        const [request] = getUserCart<CartData>({}, { signal });
        const { data: response } = await request;
        return response.data;
    } catch (e) {
        console.error(e);
    }
});

export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, size }: { productId: string; size: SIZE_TYPE }) => {
    try {
        const [request] = addProductToCart({ productId, size });
        await request;
        return { productId, size };
    } catch (e) {
        console.error(e);
    }
});

export const updateNumberInCartQuantity = createAsyncThunk(
    'cart/updateNumberInCartQuantity',
    async ({ productId, size, quantity }: { productId: string; size: SIZE_TYPE; quantity: number }) => {
        try {
            const [Response] = updateQuantity({ productId, size, quantity });
            await Response;
            return { productId, size, quantity };
        } catch (e) {
            console.error(e);
        }
    }
);

export const { selectAll: getAllCartItems, selectById, selectIds } = cartAdapter.getSelectors((state: RootState) => state.cart);
export const { removeAll } = cartSlice.actions;
export const getCartAmount = (state: RootState) => state.cart.amount;
export default cartSlice.reducer;
