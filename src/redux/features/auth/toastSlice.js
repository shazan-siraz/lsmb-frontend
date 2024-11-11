import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
    name: 'toast',
    initialState: {
        message: null,
    },
    reducers: {
        setToastMessage: (state, action) => {
            state.message = action.payload;
        },
        clearToastMessage: (state) => {
            state.message = null;
        }
    }
});

export const { setToastMessage, clearToastMessage } = toastSlice.actions;
export default toastSlice.reducer;
