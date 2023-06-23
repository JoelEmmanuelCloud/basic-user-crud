const User = require('../models/user')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const { StatusCodes } = require('http-status-codes');
const mongoose = require('mongoose');


const getAllUsers = asyncWrapper(async (req, res) => {
const page = Number(req.query.page) || 1;
const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;

const users = await User.find({})
    .sort({ name: 1 })
    .skip(offset)
    .limit(limit);

res.status(200).json({ users, nbHits: users.length });
});


const createUser = asyncWrapper(async (req, res) => {
    
    const user = await User.create(req.body)
    
    res.status(StatusCodes.CREATED).json({ user });
});


const getUser = asyncWrapper(async (req, res, next) => {
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
});



const deleteUser = asyncWrapper(async (req, res, next) => {
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
});



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