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
const {
    formNewGroup,
    createGroup,
    uploadImage,
    formEditGroup,
    editGroup,
    formEditImage,
    editImage,
    formDeleteGroup,
    deleteGroup
} = require('../controllers/groupsController')
const { formNewMeeti } = require('../controllers/meetiController')

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

    router.post(
        '/nuevo-grupo',
        userAuthenticated,
        uploadImage,
        createGroup
    )

    // update groups
    router.get(
        '/editar-grupo/:grupoId',
        userAuthenticated,
        formEditGroup,
    )

    router.post(
        '/editar-grupo/:grupoId',
        userAuthenticated,
        editGroup,
    )

    //edit image
    router.get(
        '/imagen-grupo/:grupoId',
        userAuthenticated,
        formEditImage
    )

    router.post(
        '/imagen-grupo/:grupoId',
        userAuthenticated,
        uploadImage,
        editImage
    );

    // delete groups
    router.get(
        '/eliminar-grupo/:grupoId',
        userAuthenticated,
        formDeleteGroup
    )

    router.post(
        '/eliminar-grupo/:grupoId',
        userAuthenticated,
        deleteGroup
    )

    // new meetis
    router.get(
        '/nuevo-meeti',
        formNewMeeti
    )

    return router;
}