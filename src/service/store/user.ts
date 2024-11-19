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
        const [request] = login<{ name: string; email: string; avatar: string }>({ email, password });
        const {data:response} = await request;
        return response.data;
    } catch (e) {
        console.error(e);
    }
});

export const fetchUserInfo = createAsyncThunk('user/fetchUserInfo', async () => {
    try {
        const [request] =  getInfo<{ name: string; email: string; avatar: string }>();
        const {data:response} = await request;
        return response.data;
    } catch (e) {
        console.error(e);
    }
});

export const uploadUserAvatar = createAsyncThunk('user/uploadUserAvatar', async ({ avatar }: { avatar: File }) => {
    try {
        const [request] = uploadAvatar<IUserInfo>({ avatar });
        const {data:response} = await request;
        return response.data;
    } catch (e) {
        console.error(e);
    }
});

export const updateUserName = createAsyncThunk('user/updateUserName', async ({ name }: { name: string }) => {
    try {
        const [request] = updateName<IUserInfo>({ name });
        const {data:response} = await request;
        return response.data;
    } catch (e) {
        console.error(e);
    }
});

export const updateUserEmail = createAsyncThunk('user/updateUserEmail', async ({ email }: { email: string }) => {
    try {
        const [request] =  updateEmail<IUserInfo>({ email });
        const {data:response} = await request;
        return response.data;
    } catch (e) {
        console.error(e);
    }
});

export const { logout } = userSlice.actions;
export const getUserInfo = (state: RootState) => state.user;
export default userSlice.reducer;
