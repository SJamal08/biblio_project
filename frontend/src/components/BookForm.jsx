import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBook } from '../features/bookSlice';

const BookForm = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);

    const handleSubmit = (e) => {
        e.preventDefault();
        const allData = {
            data: { title, author, genre },
            token: token
        }
        dispatch(addBook(allData));
        setTitle('');
        setAuthor('');
        setGenre('');
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 border border-gray-300 rounded shadow">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New Book</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600" htmlFor="title">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600" htmlFor="author">
                    Author
                </label>
                <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600" htmlFor="genre">
                    Genre
                </label>
                <input
                    type="text"
                    id="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full px-3 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
                Add Book
            </button>
        </form>
    );
};

export default BookForm;
