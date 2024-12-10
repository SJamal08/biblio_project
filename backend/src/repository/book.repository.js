const Book = require('../model/book.model');

const addBook = async (data) => {
    return await Book.create(data);
};

const getBooks = async (query) => {
    return await Book.find(query);
};

const updateBook = async (id, data) => {
    return await Book.findByIdAndUpdate(id, data, { new: true });
};

const deleteBook = async (id) => {
    return await Book.findByIdAndDelete(id);
};

module.exports = { addBook, getBooks, updateBook, deleteBook };
