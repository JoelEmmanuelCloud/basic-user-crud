const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors')
const bcrypt = require('bcryptjs');


const register = async (req, res) => {
    if (!req.body.email ||!req.body.password) {
        throw new BadRequestError('email and password are required');
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        throw new BadRequestError('email already exists');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const users = await User.create({ ...req.body });
    res.status(StatusCodes.CREATED).json({ users });
}

const login = async (req, res) => {
    res.send('login user')

}

const logout = async (req, res) => {
    res.send('logout user')

}

module.exports = { register, login, logout};

