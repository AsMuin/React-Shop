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
                if (action.payload) {
                    const { email, avatar } = action.payload;
                    state.email = email ?? '';
                    state.avatar = avatar ?? '';
                }
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                if (action.payload) {
                    const { name, email, avatar } = action.payload;
                    state.name = name ?? '';
                    state.email = email ?? '';
                    state.avatar = avatar ?? '';
                }
            })
            .addCase(uploadUserAvatar.fulfilled, (state, action) => {
                if (action.payload) {
                    const { name, email, avatar } = action.payload;
                    state.name = name ?? '';
                    state.email = email ?? '';
                    state.avatar = avatar ?? '';
                }
            })
            .addCase(updateUserName.fulfilled, (state, action) => {
                if (action.payload) {
                    const { name, email, avatar } = action.payload;
                    state.name = name ?? '';
                    state.email = email ?? '';
                    state.avatar = avatar ?? '';
                }
            })
            .addCase(updateUserEmail.fulfilled, (state, action) => {
                if (action.payload) {
                    const { name, email, avatar } = action.payload;
                    state.name = name ?? '';
                    state.email = email ?? '';
                    state.avatar = avatar ?? '';
                }
            });
    }
});

export const userLogin = createAsyncThunk('user/login', async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
        const response = await login<{ email: string; avatar: string }>({ email, password });
        if (!response.success) {
            // 使用 rejectWithValue 返回错误信息，避免直接抛出原始错误
            return rejectWithValue(response.message);
        }
        return response.data;
    } catch (e) {
        return rejectWithValue(e);
    }
});

export const fetchUserInfo = createAsyncThunk('user/fetchUserInfo', async (_, { signal, rejectWithValue }) => {
    try {
        const response = await getInfo<{ name: string; email: string; avatar: string }>({
            signal
        });
        if (!response.success) {
            return rejectWithValue(response.message);
        }
        return response.data;
    } catch (e) {
        return rejectWithValue(e);
    }
});

export const uploadUserAvatar = createAsyncThunk('user/uploadUserAvatar', async ({ avatar }: { avatar: File }, { rejectWithValue }) => {
    try {
        const response = await uploadAvatar<IUserInfo>({ avatar });
        if (!response.success) {
            return rejectWithValue(response.message);
        }
        return response.data;
    } catch (e) {
        rejectWithValue(e);
    }
});

export const updateUserName = createAsyncThunk('user/updateUserName', async ({ name }: { name: string }, { rejectWithValue }) => {
    try {
        const response = await updateName<IUserInfo>({ name });
        if (!response.success) {
            return rejectWithValue(response.message);
        }
        return response.data;
    } catch (e) {
        return rejectWithValue(e);
    }
});

export const updateUserEmail = createAsyncThunk('user/updateUserEmail', async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
        const response = await updateEmail<IUserInfo>({ email });
        if (!response.success) {
            return rejectWithValue(response.message);
        }
        return response.data;
    } catch (e) {
        return rejectWithValue(e);
    }
});

export const { logout } = userSlice.actions;
export const getUserInfo = (state: RootState) => state.user;
export default userSlice.reducer;
