const bookRepository = require('../repository/book.repository');

const createBook = async (req, res) => {
    try {
        const book = await bookRepository.addBook(req.body);
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error creating book', error });
    }
};

const getBooks = async (req, res) => {
    try {
        const books = await bookRepository.getBooks(req.query);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving books', error });
    }
};

const updateBook = async (req, res) => {
    try {
        const book = await bookRepository.updateBook(req.params.id, req.body);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error updating book', error });
    }
};

const deleteBook = async (req, res) => {
    try {
        await bookRepository.deleteBook(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book', error });
    }
};

module.exports = { createBook, getBooks, updateBook, deleteBook };
