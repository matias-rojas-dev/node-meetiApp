const express = require('express')
const path = require('path')
require('dotenv').config({ path: 'variables.env' })
const router = require('./routes')


const app = express()

app.use('/', router())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))

app.use(express.static('public'))

app.listen(process.env.PORT, () => {
    console.log('Server is running')
})