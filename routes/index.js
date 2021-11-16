const express = require('express')
const { home } = require('../controllers/homeController')
const { formCreateAccount } = require('../controllers/usersController')
const router = express.Router()

module.exports = function () {
    router.get('/', home)

    router.get('/crear-cuenta', formCreateAccount)

    return router;
}