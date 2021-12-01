const express = require('express')
const { home } = require('../controllers/homeController')
const router = express.Router()

const {
    formCreateAccount,
    createNewAccount,
    formLogin,
    confirmAccount,
} = require('../controllers/usersController')

const {
    authenticateUser, userAuthenticated
} = require('../controllers/authController')

const {
    panelAdmin,
} = require('../controllers/adminController')
const { formNewGroup, createGroup
} = require('../controllers/groupsController')

module.exports = function () {
    router.get('/', home)

    // create an account
    router.get('/crear-cuenta', formCreateAccount)
    router.post('/crear-cuenta', createNewAccount)

    // confirm account
    router.get('/confirmar-cuenta/:email', confirmAccount)

    // login
    router.get('/iniciar-sesion', formLogin)
    router.post('/iniciar-sesion', authenticateUser)

    // panel admin
    router.get(
        '/panel-admin',
        userAuthenticated,
        panelAdmin
    )

    // new groups
    router.get(
        '/nuevo-grupo',
        userAuthenticated,
        formNewGroup
    )

    router.post('/nuevo-grupo', createGroup)


    return router;
}