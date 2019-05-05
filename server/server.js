require('./config/config')
const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const app = express();

app.use(bodyparser.urlencoded({extended:false}))

app.use(bodyparser.json())

app.use(require('./routes/usuario'))


mongoose.connect('mongodb://localhost:27017/cinemex',{ useNewUrlParser: true },(err,res)=>{
    if(err) throw new Error
    console.log('Base de datos funcionando')
})
app.listen(process.env.PORT,(err)=>{
    if(err) throw Error(err)
    console.log(`Servidor creado en el puerto ${process.env.PORT}`)
})