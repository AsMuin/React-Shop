import { getInfo, login } from '@/service/api/user';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '.';

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
        builder
            .addCase(userLogin.fulfilled, (state, action) => {
                const { name, email, avatar } = action.payload!;
                state.name = name;
                state.email = email;
                state.avatar = avatar;
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                const { name, email, avatar } = action.payload!;
                state.name = name ?? '';
                state.email = email ?? '';
                state.avatar = avatar ?? '';
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
export const fetchUserInfo = createAsyncThunk('user/fetchUserInfo', async () => {
    try {
        const response = await getInfo<{ name: string; email: string; avatar: string }>();
        return response.data;
    } catch (e) {
        console.error(e);
    }
});
export const { logout } = userSlice.actions;
export const getUserInfo = (state: RootState) => state.user;
export default userSlice.reducer;
