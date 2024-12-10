const Loan = require('../model/loan.model');

const addLoan = async (data) => {
    return await Loan.create(data);
};

const getLoans = async (query) => {
    return await Loan.find(query).populate('user book');
};

const updateLoan = async (id, data) => {
    return await Loan.findByIdAndUpdate(id, data, { new: true }).populate('user book');
};

module.exports = { addLoan, getLoans, updateLoan };
