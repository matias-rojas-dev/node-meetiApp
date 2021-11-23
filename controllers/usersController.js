const Users = require('../models/Users')

exports.formCreateAccount = (req, res) => {
    res.render('createAccount', {
        titlePage: 'Crea tu cuenta'
    })
}

exports.createNewAccount = async (req, res) => {

    req.checkBody('confirmPassword', 'La contraseña confirmada no puede ir vacía').notEmpty()
    req.checkBody('confirmPassword', 'Las contraseñas no son iguales').equals(req.body.password)

    const expressErrors = req.validationErrors()

    try {
        await Users.create(req.body)
        req.flash('exito', 'Hemos enviado un correo de confirmación')
        res.redirect('/iniciar-sesion')
    } catch (err) {
        const sequelizeErrors = err.errors.map(error => error.message)
        // get the msg from the error (express validation)
        const errExpress = expressErrors.map(error => error.msg)
        // concat both arrays
        const listErrors = [...sequelizeErrors, ...errExpress]
        req.flash('error', listErrors)
        res.redirect('/crear-cuenta')
    }

}

exports.formLogin = (req, res) => {
    res.render('login', {
        titlePage: 'Iniciar sesión'
    })
}