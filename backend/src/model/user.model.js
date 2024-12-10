const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    role: { type: String, enum: ['user', 'librarian', 'admin'], default: 'user' },
    password: { type: String, required: true },
}, { timestamps: true });

// Middleware pour hasher le mot de passe avant de sauvegarder
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Méthode pour vérifier le mot de passe
userSchema.methods.isPasswordValid = async function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
