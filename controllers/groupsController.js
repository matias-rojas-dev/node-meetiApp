const Categories = require('../models/Categories');
const Groups = require('../models/Groups');

const multer = require('multer')
const shortid = require('shortid')

const multerConfig = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '/../public/uploads/groups')
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1] // image/jpg -> jpg
            cb(null, `${shortid.generate()}.${extension}`) // generate a random id and add the extension to the file -> randomid.jpg
        }
    })
}

const upload = multer(multerConfig).single('image')

exports.formNewGroup = async (req, res) => {
    const categories = await Categories.findAll()
    res.render('newGroup', {
        titlePage: 'Crear Grupo',
        categories
    });
}

// save the new group in the DB
exports.createGroup = async (req, res) => {

    req.sanitizeBody('name')
    req.sanitizeBody('url')


    const group = req.body
    group.userId = req.user.id
    group.categoryId = req.body.category

    // read the image
    group.image = req.file.filename

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

// upload image
exports.uploadImage = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            console.log(error)
        } else {
            next()
        }
    })
}