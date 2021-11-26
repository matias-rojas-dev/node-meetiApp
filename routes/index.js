const express = require('express')
const { home } = require('../controllers/homeController')
const router = express.Router()

const {
    formCreateAccount,
    createNewAccount,
    formLogin,
    confirmAccount
} = require('../controllers/usersController')

module.exports = function () {
    router.get('/', home)

    // create an account
    router.get('/crear-cuenta', formCreateAccount)
    router.post('/crear-cuenta', createNewAccount)

    // confirm account
    router.get('/confirmar-cuenta/:email', confirmAccount)

    // login
    router.get('/iniciar-sesion', formLogin)


    return router;
}