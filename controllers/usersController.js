const Users = require('../models/Users')

exports.formCreateAccount = (req, res) => {
    res.render('createAccount', {
        titlePage: 'Crea tu cuenta'
    })
}

exports.createNewAccount = async (req, res) => {
    const user = await Users.create(req.body)

    console.log('Usuario creado', user)
}