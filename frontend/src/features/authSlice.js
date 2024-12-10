import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
    try {
        const response = await axios.get('/api/auth/me', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data; // Cela inclura l'ID, le rôle et d'autres informations de l'utilisateur
    } catch (error) {
        console.error('User not authenticated');
        throw new Error('Not authenticated');
    }
});

const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload; // L'utilisateur avec ses infos (y compris le rôle)
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isAuthenticated = false;
                state.user = {};
            });
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
