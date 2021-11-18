const Sequelize = require('sequelize')
const db = require('../config/db')
const bcrypt = require('bcrypt-nodejs')

const Users = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(60),
    image: Sequelize.STRING(60),
    email: {
        type: Sequelize.STRING(30),
        allowNull: false,
        validate: {
            isEmail: {
                messageDB: 'Agrega un correo válido'
            }
        },
        unique: {
            args: true,
            messageDB: 'Usuario ya registrado'
        },

    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                messageDB: 'La contraseña no puede ir vacía'
            }
        }
    },
    active: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    tokenPassword: Sequelize.STRING,
    tokenExpire: Sequelize.DATE
}, {
    hooks: {
        beforeCreate(user) {
            user.password = bcrypt.hashSync(
                user.password,
                bcrypt.genSaltSync(10),
                null
            )
        }
    }
})

Users.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password) //(password in the db, password in the req.body)
}

module.exports = Users;