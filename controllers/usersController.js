const Users = require('../models/Users')
const sendEmail = require('../handlers/email')
exports.formCreateAccount = (req, res) => {
    res.render('createAccount', {
        titlePage: 'Crea tu cuenta'
    })
}

exports.createNewAccount = async (req, res) => {

    const user = req.body

    req.checkBody('passwordConfirm', 'Por favor, confirma la contraseña').notEmpty()
    req.checkBody('passwordConfirm', 'Las contraseñas no son iguales').equals(req.body.password)
    const expressErrors = req.validationErrors()

    try {
        await Users.create(user)
        // URL
        const url = `http://${req.headers.host}/confirmar-cuenta/${user.email}`
        // send email 
        await sendEmail.sendEmail({
            user,
            url,
            subject: 'Confirma tu cuenta de Meeti',
            file: 'confirmAccount'
        })

        req.flash('exito', 'Hemos enviado un correo de confirmación')
        res.redirect('/iniciar-sesion')

    } catch (error) {
        // get the msgs from the errors (express validation)
        const sequelizeErrors = error.errors.map(err => err.message)
        // get only the msg of the errors
        const errExpress = expressErrors.map(err => err.msg)
        // concat both arrays
        const listErrors = [...sequelizeErrors, ...errExpress]
        req.flash('error', listErrors)
        res.redirect('/crear-cuenta')
    }

}

// CONFIRM ACCOUNT
exports.confirmAccount = async (req, res, next) => {
    // verify the user exists
    const user = await Users.findOne({
        where: {
            email: req.params.email
        }
    })

    // if the user not exists
    if (!user) {
        req.flash('error', 'No existe el usuario')
        res.redirect('/crear-cuenta')
        return next()
    }

    // if the user is already confirmed
    user.active = 1
    await user.save()
    req.flash('exito', 'Cuenta confirmada')
    res.redirect('/iniciar-sesion')
}

exports.formLogin = (req, res) => {
    res.render('login', {
        titlePage: 'Iniciar sesión'
    })
}