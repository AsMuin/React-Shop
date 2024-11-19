import { getInfo, login, updateEmail, updateName, uploadAvatar } from '@/service/api/user';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '.';
interface IUserInfo {
    name: string;
    email: string;
    avatar: string;
}
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
                state.name = name ?? '';
                state.email = email ?? '';
                state.avatar = avatar ?? '';
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                const { name, email, avatar } = action.payload!;
                state.name = name ?? '';
                state.email = email ?? '';
                state.avatar = avatar ?? '';
            })
            .addCase(uploadUserAvatar.fulfilled, (state, action) => {
                const { name, email, avatar } = action.payload!;
                state.name = name ?? '';
                state.email = email ?? '';
                state.avatar = avatar ?? '';
            })
            .addCase(updateUserName.fulfilled, (state, action) => {
                const { name, email, avatar } = action.payload!;
                state.name = name ?? '';
                state.email = email ?? '';
                state.avatar = avatar ?? '';
            })
            .addCase(updateUserEmail.fulfilled, (state, action) => {
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

export const fetchUserInfo = createAsyncThunk('user/fetchUserInfo', async (_, { signal }) => {
    try {
        const response = await getInfo<{ name: string; email: string; avatar: string }>(null, {
            signal
        });
        return response.data;
    } catch (e) {
        console.error(e);
    }
});

export const uploadUserAvatar = createAsyncThunk('user/uploadUserAvatar', async ({ avatar }: { avatar: File }) => {
    try {
        const response = await uploadAvatar<IUserInfo>({ avatar });
        return response.data;
    } catch (e) {
        console.error(e);
    }
});

export const updateUserName = createAsyncThunk('user/updateUserName', async ({ name }: { name: string }) => {
    try {
        const response = await updateName<IUserInfo>({ name });
        return response.data;
    } catch (e) {
        console.error(e);
    }
});

export const updateUserEmail = createAsyncThunk('user/updateUserEmail', async ({ email }: { email: string }) => {
    try {
        const response = await updateEmail<IUserInfo>({ email });
        return response.data;
    } catch (e) {
        console.error(e);
    }
});

export const { logout } = userSlice.actions;
export const getUserInfo = (state: RootState) => state.user;
export default userSlice.reducer;
