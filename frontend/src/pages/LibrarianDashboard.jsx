import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../features/bookSlice';
import BookForm from '../components/BookForm';
import LoanHistory from '../components/LoanHistory';
import BookList from '../components/Booklist';

const LibrarianDashboard = () => {
    const dispatch = useDispatch();
    const { books } = useSelector((state) => state.books);

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Librarian Dashboard</h1>

            <div className="mb-6">
                <BookForm />
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Book List</h2>
                <BookList books={books} />
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Loan History</h2>
                <LoanHistory />
            </div>
        </div>
    );
};

export default LibrarianDashboard;
