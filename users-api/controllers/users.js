const getAllUsers = async (req, res) => {
    res.send('get all user')

const createUser = async (req, res) => {
    res.send('user created')

}

const getUser = async (req, res) => {
    res.send('get user')

}

const updateUser = async (req, res) => {
    res.send('update user')

}

const deleteUser = async (req, res) => {
    res.send('delete user')

}

module.exports = { getAllUsers, createUser, updateUser, deleteUser, updateUser}
