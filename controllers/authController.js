const passport = require("passport")

exports.authenticateUser = passport.authenticate('local', {
    successRedirect: '/panel-admin',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
})

// check if the user is authenticated

exports.userAuthenticated = (req, res, next) => {
    // if the user is authenticated, continue
    if (req.isAuthenticated()) {
        return next()
    }
    // if the user is not authenticated, redirect to login page
    return res.redirect('/iniciar-sesion')
}