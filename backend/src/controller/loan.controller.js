const loanRepository = require('../repository/loan.repository');
const bookRepository = require('../repository/book.repository');

const createLoan = async (req, res) => {
    try {
        const { user, book } = req.body;

        // Vérifier la disponibilité du livre
        const selectedBook = await bookRepository.getBooks({ _id: book });
        if (!selectedBook[0] || selectedBook[0].availableCopies < 1) {
            return res.status(400).json({ message: 'Book is not available' });
        }

        // Ajouter le prêt
        const loan = await loanRepository.addLoan(req.body);

        // Réduire le nombre de copies disponibles
        await bookRepository.updateBook(book, { $inc: { availableCopies: -1 } });

        res.status(201).json(loan);
    } catch (error) {
        res.status(500).json({ message: 'Error creating loan', error });
    }
};

const getLoans = async (req, res) => {
    try {
        const loans = await loanRepository.getLoans(req.query);
        res.status(200).json(loans);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving loans', error });
    }
};

const returnLoan = async (req, res) => {
    try {
        const { id } = req.params;

        // Mettre à jour le prêt
        const loan = await loanRepository.updateLoan(id, {
            isReturned: true,
            returnDate: new Date(),
        });

        // Rendre la copie disponible
        await bookRepository.updateBook(loan.book._id, { $inc: { availableCopies: 1 } });

        res.status(200).json(loan);
    } catch (error) {
        res.status(500).json({ message: 'Error returning loan', error });
    }
};

module.exports = { createLoan, getLoans, returnLoan };
