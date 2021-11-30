const Sequelize = require('sequelize')
const db = require('../config/db')
const uuid = require('uuid/v4')

const Groups = db.define('groups', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: uuid()
    },
    name: {
        type: Sequelize.TEXT(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El grupo debe tener un nombre'
            }
        }
    },
    description: {
        type: Sequelize.TEXT(500),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El grupo debe tener una descripción'
            }
        }
    },
    url: Sequelize.TEXT,
    image: Sequelize.TEXT,
})
module.exports = Groups