import { login } from '@/api/user';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        email: '',
        avatar: ''
    },
    reducers: {
        logout: state => {
            state.name = '';
            state.email = '';
            state.avatar = '';
        }
    },
    extraReducers(builder) {
        builder.addCase(userLogin.fulfilled, (state, action) => {
            const { name, email, avatar } = action.payload!;
            state.name = name;
            state.email = email;
            state.avatar = avatar;
        });
    }
});
export const userLogin = createAsyncThunk('user/login', async ({ email, password }: { email: string; password: string }) => {
    try {
        const response = await login<{ name: string; email: string; avatar: string }>({ email, password });
        return response.data;
    } catch (e) {
        console.error(e);
    }
});
export const { logout } = userSlice.actions;
export default userSlice.reducer;
