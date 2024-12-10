import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import booksReducer from './features/bookSlice';
// import usersReducer from './features/usersSlice';
import loansReducer from './features/loanSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        books: booksReducer,
        // users: usersReducer,
        loans: loansReducer,
    },
});
