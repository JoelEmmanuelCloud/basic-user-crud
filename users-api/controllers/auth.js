const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');


const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT()
    res.
    status(StatusCodes.CREATED).json({ user:{name: user.name}, token });
}

const login = async (req, res) => {
    res.send('login user')

}

const logout = async (req, res) => {
    res.send('logout user')

}

module.exports = { register, login, logout};