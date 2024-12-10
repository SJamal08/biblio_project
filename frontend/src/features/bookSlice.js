import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiBaseUrl = "http://localhost/5000";

// const token = localStorage.getItem('token');

// Async thunk to fetch books
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
    const response = await axios.get(apiBaseUrl+'/api/books');
    return response.data;
});

// Async thunk to add a book
export const addBook = createAsyncThunk('books/addBook', async (allData) => {

    const response = await axios.post(apiBaseUrl+'/api/books', allData.data, {
        headers: {
            Authorization: `Bearer `+ allData.token
        }
    });
    return response.data;
});

// Async thunk to delete a book
export const deleteBook = createAsyncThunk('books/deleteBook', async (bookId) => {
    await axios.delete(`/api/books/${bookId}`);
    return bookId;
});

const bookSlice = createSlice({
    name: 'books',
    initialState: {
        books: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.books = action.payload;
                state.loading = false;
            })
            .addCase(fetchBooks.rejected, (state) => {
                state.loading = false;
            })
            .addCase(addBook.fulfilled, (state, action) => {
                state.books.push(action.payload);
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.books = state.books.filter(book => book._id !== action.payload);
            });
    },
});

export default bookSlice.reducer;
