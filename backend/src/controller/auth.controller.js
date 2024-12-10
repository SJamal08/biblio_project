const userRepository = require('../repository/user.repository');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');
const bcrypt = require('bcrypt');

const getMe = async (req, res) => {
    try {
        // L'ID utilisateur est récupéré depuis le middleware authMiddleware
        const user = await User.findById(req.user.id).select('-password'); // Exclure le mot de passe
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifie si l'utilisateur existe
        const user = await userRepository.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Vérifie le mot de passe
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Génère un token JWT
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

module.exports = { login, getMe };
