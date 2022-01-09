const Groups = require('../models/Groups')

exports.panelAdmin = async (req, res) => {

    const groups = await Groups.findAll({
        where: { userId: req.user.id }
    })

    res.render('panelAdmin', {
        titlePage: 'Panel Administrador',
        groups
    });
}