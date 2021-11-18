const express = require('express')
const { home } = require('../controllers/homeController')
const router = express.Router()

const {
    formCreateAccount,
    createNewAccount
} = require('../controllers/usersController')

module.exports = function () {
    router.get('/', home)

    router.get('/crear-cuenta', formCreateAccount)
    router.post('/crear-cuenta', createNewAccount)

    return router;
}