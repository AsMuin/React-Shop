import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        email: '',
        avatar: ''
    },
    reducers: {}
});
export default userSlice.reducer;