import { createSlice } from "@reduxjs/toolkit";

// For user authentication
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: true,
        error: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload; // Remove .user since your API returns user data directly
            state.loading = false;
            state.error = null;
        },
        logout: (state) => {
            state.user = null;
            state.loading = false; // Reset loading state
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        clearError: (state) => {
            state.error = null;
        }
    }
});

export const { login, logout, setLoading, setError, clearError } = authSlice.actions;
export default authSlice.reducer;