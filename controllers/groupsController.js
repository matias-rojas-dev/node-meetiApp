const Categories = require('../models/Categories');
const Groups = require('../models/Groups');

exports.formNewGroup = async (req, res) => {
    const categories = await Categories.findAll()
    res.render('newGroup', {
        titlePage: 'Crear Grupo',
        categories
    });
}

// save the new group in the DB
exports.createGroup = async (req, res) => {

    req.sanitizeBody('name');
    req.sanitizeBody('url');


    const group = req.body
    group.userId = req.user.id
    group.categoryId = req.body.category



    try {
        // save the new group in the DB
        await Groups.create(group)
        req.flash('exito', 'Grupo creado correctamente')
        res.redirect('/panel-admin')
    } catch (error) {
        const sequelizeErrors = error.errors.map(err => err.message)
        req.flash('error', sequelizeErrors)
        res.redirect('/nuevo-grupo')
    }
}