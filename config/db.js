const Sequelize = require('sequelize')

module.exports = new Sequelize('meeti', 'postgres', '', {
    host: '127.0.0.1',
    post: '5432',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false, //hidden the db information
    //define: { //show when the user has been created and updated
    //    timestamps: false
    //}

})