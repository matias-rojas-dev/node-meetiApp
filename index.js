const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const path = require('path')
require('dotenv').config({ path: 'variables.env' })
const router = require('./routes')


const app = express()
app.use(expressLayouts)
app.set('view engine', 'ejs') // haenable EJS as template engine
app.set('views', path.join(__dirname, './views')) // views location

app.use('/', router())

app.use(expressLayouts)


app.use(express.static('public')) //static files

app.listen(process.env.PORT, () => {
    console.log('Server is running')
})