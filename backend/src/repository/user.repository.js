const User = require('../model/user.model');

const addUser = async (data) => {
    return await User.create(data);
};

const getUserById = async (id) => {
    return await User.findById(id);
};

const getUserByEmail = async (email) => {
    return await User.findOne({ email });
};

const updateUser = async (id, data) => {
    return await User.findByIdAndUpdate(id, data, { new: true });
};

const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};

module.exports = { addUser, getUserById, getUserByEmail, updateUser, deleteUser };
