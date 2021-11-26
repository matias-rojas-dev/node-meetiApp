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
    const template = __dirname + `/../views/emails/${options.file}.ejs`

    // compile the file
    const compile = ejs.compile(fs.readFileSync(template, 'utf8')) // readFileAsync: return the contents of the path

    // create the HTML  
    const html = compile({ url: options.url })

    // config the options of the email
    const mailOptions = {
        from: 'Meeti <noreply@meeti.com>',
        to: options.user.email,
        subject: options.object,
        html
    }
    // send email
    const sendConfirmationEmail = util.promisify(transporter.sendMail, transporter)
    return sendConfirmationEmail.call(transporter, mailOptions)
}