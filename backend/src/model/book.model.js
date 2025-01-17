const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    ISBN: { type: String, unique: true, required: true },
    publicationDate: { type: Date },
    availableCopies: { type: Number, default: 1 },
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
