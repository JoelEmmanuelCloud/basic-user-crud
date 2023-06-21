const User = require('../models/user')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const { StatusCodes } = require('http-status-codes');


const getAllUsers = asyncWrapper(async (req, res) => {
const users = await Users.find({})
res.status(200).json({ users })
})

const createUser = asyncWrapper(async (req, res) => {
    const { password, confirmPassword } = req.body;
    
    if (password !== confirmPassword) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Passwords do not match' });
    }
const user = await User.create(req.body)
res.status(StatusCodes.CREATED).json({ user });

})

const getUser = asyncWrapper(async (req, res, next) => {
const { id: userID } = req.params
const user = await User.findOne({ _id: userID })
if (!user) {
    return next(createCustomError(`No task with id : ${userID}`, 404))
}

res.status(200).json({ user })
})

const deleteUser = asyncWrapper(async (req, res, next) => {
const { id: userID } = req.params
const user = await Task.findOneAndDelete({ _id: userID })
if (!user) {
    return next(createCustomError(`No task with id : ${userID}`, 404))
}
res.status(200).json({ user })
})

const updateUser = asyncWrapper(async (req, res, next) => {
const { id: userID } = req.params

const user = await User.findOneAndUpdate({ _id: userID }, req.body, {
    new: true,
    runValidators: true,
})

if (!user) {
    return next(createCustomError(`No task with id : ${userID}`, 404))
}

res.status(200).json({ user })
})


module.exports = { getAllUsers, createUser, updateUser, deleteUser, getUser}
