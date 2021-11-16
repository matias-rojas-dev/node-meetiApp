const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const path = require('path')
require('dotenv').config({ path: 'variables.env' })
const router = require('./routes')


const app = express()
app.use(expressLayouts)
app.set('view engine', 'ejs') // haenable EJS as template engine
app.set('views', path.join(__dirname, './views')) // views location


app.use(expressLayouts)

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