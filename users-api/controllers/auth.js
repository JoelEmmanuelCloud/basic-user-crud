const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors')
const bcrypt = require('bcryptjs');


const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    res.status(StatusCodes.CREATED).json({ user });
}

const login = async (req, res) => {
    res.send('login user')

}

const logout = async (req, res) => {
    res.send('logout user')

}

module.exports = { register, login, logout};