const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const path = require('path')
const router = require('./routes')
const bodyParser = require('body-parser')
// Dev variables
require('dotenv').config({ path: 'variables.env' })


// Config and models DB
const db = require('./config/db')
require('./models/Users')
db.sync()
    .then(() => console.log('DB CONNECTED'))
    .catch((error) => {
        console.log('ERROR IN THE DB')
    })

const app = express()

// Body parser to read forms
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use(expressLayouts)
app.set('view engine', 'ejs') // haenable EJS as template engine
app.set('views', path.join(__dirname, './views')) // views location



app.use(express.static('public')) //static files


app.use((req, res, next) => {
    const date = new Date()
    res.locals.year = date.getFullYear()
    next()
})

app.use('/', router())

app.listen(process.env.PORT, () => {
    console.log('Server is running')
})