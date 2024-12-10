import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteBook } from '../features/bookSlice';

const BookList = ({ books }) => {
    const dispatch = useDispatch();

    const handleDelete = (bookId) => {
        dispatch(deleteBook(bookId));
    };

    return (
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
            <thead>
                <tr>
                    <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Title</th>
                    <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Author</th>
                    <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Genre</th>
                    <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book) => (
                    <tr key={book._id}>
                        <td className="py-2 px-4 text-sm text-gray-700">{book.title}</td>
                        <td className="py-2 px-4 text-sm text-gray-700">{book.author}</td>
                        <td className="py-2 px-4 text-sm text-gray-700">{book.genre}</td>
                        <td className="py-2 px-4">
                            <button
                                onClick={() => handleDelete(book._id)}
                                className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default BookList;
