const User = require('../models/user')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const { StatusCodes } = require('http-status-codes');
const mongoose = require('mongoose');


const getAllUsers = async (req, res) => {
const users = await User.find({});
res.status(200).json({ users });
};

const createUser = asyncWrapper(async (req, res) => {
const { password, confirmPassword } = req.body;


if (!password || !confirmPassword) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please enter both passwords' });
}

if (password.trim() !== confirmPassword.trim()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Passwords do not match' });
}


const user = await User.create(req.body);


res.status(201).json({ user });
});

const getUser = async (req, res, next) => {
    const { id: userID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userID)) {
        const error = createCustomError('Invalid user ID', StatusCodes.BAD_REQUEST);
        return next(error);
    }

    const user = await User.findOne({ _id: userID });

    if (!user) {
    const error = createCustomError('User not found', StatusCodes.NOT_FOUND);
    return next(error);
    }

    res.status(StatusCodes.OK).json({ user });
};

const deleteUser = async (req, res, next) => {
    const { id: userID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userID)) {
        const error = createCustomError('Invalid user id', StatusCodes.BAD_REQUEST);
    
        return next(error);
    }

    const user = await User.findOneAndDelete({ _id: userID });

    if (!user) {
    const error = createCustomError('User not found', StatusCodes.NOT_FOUND);
    return next(error);
    }

    res.status(StatusCodes.OK).json({ user });
};

const updateUser = asyncWrapper(async (req, res, next) => {
    const { id: userID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userID)) {
        const error = createCustomError('Invalid user ID', StatusCodes.BAD_REQUEST);
        return next(error);
    }

    const user = await User.findOneAndUpdate(
    { _id: userID },
    req.body,
    { new: true, runValidators: true }
    );

    if (!user) {
    const error = createCustomError('User not found', StatusCodes.NOT_FOUND);
    return next(error);
    }

    res.status(StatusCodes.OK).json({ user });
});

module.exports = { getAllUsers, createUser, updateUser, deleteUser, getUser };