const express = require('express')

const router = express.Router()

const { getAllUsers,
        createUser,
        updateUser,
        deleteUser,
        updateUser} = require('../controllers/users')

router.route('/').post(createUser).get(getAllUsers);

router.route('/:id').get(getUser).delete(deleteUser).patch(updateUser)

module.exports = router

