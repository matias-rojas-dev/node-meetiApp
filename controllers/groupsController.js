const Categories = require('../models/Categories');
const Groups = require('../models/Groups');

const multer = require('multer')
const shortid = require('shortid')

const multerConfig = {
    limits: {
        fileSize: 130000, // 100kb
    },
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '/../public/uploads/groups')
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1] // image/jpg -> jpg
            cb(null, `${shortid.generate()}.${extension}`) // generate a random id and add the extension to the file -> randomid.jpg
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            // the file is allowed to be uploaded 
            cb(null, true) // true means the file is allowed to be uploaded
        } else {
            // the file is not allowed to be uploaded
            cb(new Error('Formato no válido'), false) // false means the file is not allowed to be uploaded
        }
    }
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
    if (req.file) {
        group.image = req.file.filename
    }

    try {
        // save the new group in the DB
        await Groups.create(group)
        req.flash('exito', 'Grupo creado correctamente')
        res.redirect('/panel-admin')
    } catch (error) {
        try {
            const sequelizeErrors = error.errors.map(err => err.message)
            req.flash('error', sequelizeErrors)
            res.redirect('/nuevo-grupo')
        } catch (error) {
            req.flash('error', 'Ha ocurrido un error')
            res.redirect('/nuevo-grupo')
        }
    }
}

// upload image
exports.uploadImage = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            if (error instanceof multer.MulterError) {
                if (error.code === 'LIMIT_FILE_SIZE') {
                    req.flash('error', 'El archivo es muy grande')
                } else {
                    req.flash('error', error.message)
                }
            } else if (error.hasOwnProperty('message')) {
                // if the error has a message property, it means that it is a sequelize error
                req.flash('error', error.message)
            }
            res.redirect('back')
            return;
        } else {
            next()
        }
    })
}

exports.formEditGroup = async (req, res) => {

    let queries = [];
    queries.push(Groups.findByPk(req.params.grupoId));
    queries.push(Categories.findAll());

    const [group, categories] = await Promise.all(queries);

    res.render('editGroup', {
        titlePage: `Editar grupo: ${group.name}`,
        group,
        categories
    })
}