const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy //this allow the login with a user and password
const User = require('../models/Users')

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },

    async (email, password, done) => {
        // this code run when the user complete the form
        const user = await User.findOne({
            where: {
                email,
                active: 1
            }
        })

        if (!user) {
            return done(null, false, { message: 'Este correo no se encuentra registrado' })
        }

        // if the user exists, compare your passwords
        const verifyPassword = await user.validatePassword(password)

        if (!verifyPassword) {
            return done(null, false, { message: 'La contraseña es incorrecta' })
        } else {
            return done(null, user, { message: 'Bienvenido a Meeti' })
        }
    }
))

//http://www.passportjs.org/docs/configure/
passport.serializeUser(function (user, cb) {
    cb(null, user)
})

passport.deserializeUser(function (user, cb) {
    cb(null, user)
})

module.exports = passport