import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch loan history
export const fetchLoanHistory = createAsyncThunk('loans/fetchLoanHistory', async () => {
    const response = await axios.get('/api/loans');
    return response.data;
});

const loanSlice = createSlice({
    name: 'loans',
    initialState: {
        loanHistory: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLoanHistory.fulfilled, (state, action) => {
                state.loanHistory = action.payload;
            });
    },
});

export default loanSlice.reducer;
