const express = require('express')
const app = express()

app.use(require('./login'))
app.use(require('./usuario'))
app.use(require('./movies'))
app.use(require('./rooms'))
app.use(require('./funcion'))
app.use(require('./tickets'))
module.exports = app