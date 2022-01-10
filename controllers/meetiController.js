const Groups = require("../models/Groups")

exports.formNewMeeti = async (req, res) => {

    // get authenticated user groups
    const groups = await Groups.findAll({
        where: {
            userId: req.user.id
        }
    })

    res.render('newMeeti', {
        titlePage: 'Crear nuevo Meeti',
        groups
    })
}