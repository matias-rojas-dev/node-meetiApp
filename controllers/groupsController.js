const Categories = require('../models/Categories');

exports.formNewGroup = async (req, res) => {
    const categories = await Categories.findAll()
    res.render('newGroup', {
        titlePage: 'Crear Grupo',
        categories
    });
}