const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const path = require('path')
const router = require('./routes')
const flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const passport = require('./config/passport')
// Dev variables
require('dotenv').config({ path: 'variables.env' })


// Config and models DB
const db = require('./config/db')
require('./models/Users')
require('./models/Categories')
db.sync()
    .then(() => console.log('DB CONNECTED'))
    .catch((error) => {
        console.log('ERROR IN THE DB')
    })

const app = express()

// Body parser to read forms
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// express validator: to validate passwords are equal
app.use(expressValidator())

app.use(expressLayouts)
app.set('view engine', 'ejs') // haenable EJS as template engine
app.set('views', path.join(__dirname, './views')) // views location



app.use(express.static('public')) //static files

// enable cookie parser
app.use(cookieParser())
app.use(session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
}))
app.use(flash())

// initialize passport
app.use(passport.initialize())
app.use(passport.session())


app.use((req, res, next) => {
    res.locals.messages = req.flash()
    const date = new Date()
    res.locals.year = date.getFullYear()
    next()
})

app.use('/', router())

app.listen(process.env.PORT, () => {
    console.log('Server is running')
})