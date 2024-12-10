const userRepository = require('../repository/user.repository');

const createUser = async (req, res) => {
    try {
        const user = await userRepository.addUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await userRepository.getUserById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await userRepository.updateUser(req.params.id, req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

const deleteUser = async (req, res) => {
    try {
        await userRepository.deleteUser(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

module.exports = { createUser, getUser, updateUser, deleteUser };
