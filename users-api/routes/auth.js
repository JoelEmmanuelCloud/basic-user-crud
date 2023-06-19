const express = require('express')

const router = express.Router()

const {logic, register} = require('../controllers/auth');

router.post('/register', register);

router.post('/login', logic);

module.exports = router

