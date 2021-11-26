const nodemailer = require('nodemailer')
const config = require('../config/email')
const fs = require('fs')
const util = require('util')
const ejs = require('ejs')

let transporter = nodemailer.createTransport({

    host: config.host,
    port: config.port,
    auth: {
        user: config.user,
        pass: config.pass
    }

})

exports.sendEmail = async (options) => {
    console.log(options)

    // reed the file to email


    // compile the file

    // create the HTML  


}