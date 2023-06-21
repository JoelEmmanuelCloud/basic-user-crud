const User = require('../models/user')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const { StatusCodes } = require('http-status-codes');


const getAllUsers = async (req, res) => {
const users = await User.find({});
res.status(200).json({ users });
};

const createUser = asyncWrapper(async (req, res) => {
const { password, confirmPassword } = req.body;


if (!password || !confirmPassword) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please enter both passwords' });
}

if (password !== confirmPassword) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Passwords do not match' });
}


const user = await User.create(req.body);


res.status(201).json({ user });
});

const getUser = async (req, res, next) => {
const { id: userID } = req.params;
const user = await User.findOne({ _id: userID });

if (!user) {
    const error = createCustomError('user not found', 404);
    console.log({
        statusCode: error.statusCode,
        message: error.message,
        error: error.error,
    });
    return next(error);
}

res.status(200).json({ user });
};

const deleteUser = async (req, res, next) => {
const { id: userID } = req.params;
const user = await User.findOneAndDelete({ _id: userID });

if (!user) {
    const error = createCustomError('user not found', 404);
    console.log({
        statusCode: error.statusCode,
        message: error.message,
        error: error.error,
    });
    return next(error);
}

res.status(200).json({ user });
};

const updateUser = asyncWrapper(async (req, res, next) => {
const { id: userID } = req.params;

const user = await User.findOneAndUpdate(
    { _id: userID },
    req.body,
    { new: true, runValidators: true }
    );

    if (!user) {
        const error = createCustomError('user not found', 404);
        console.log({
            statusCode: error.statusCode,
            message: error.message,
            error: error.error,
        });
        return next(error);
    }
res.status(200).json({ user });
});


module.exports = { getAllUsers, createUser, updateUser, deleteUser, getUser };