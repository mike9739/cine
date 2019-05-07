const express = require('express')
let { verificarToken } = require('../middlewares/auth')
let Funcion = require('../models/funcion')
let Movies = require('../models/movies')
let Room = require('../models/rooms')

const app = express()

//
//Mostrar todas las funciones
app.get('/funciones', (req, res) => {

    Funcion.find({}).exec((err, funciones) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            funciones
        });
    })

})

// Mostar una funcion por día

app.get('funciones/:dia', (req, res) => {

})

app.post('/funciones', (req, res) => {
    let body = req.body
    let movie_name = body.movie

    Movies.find({ movie_name: movie_name }).exec((err, movie) => {
        if (err) {
            res.json({
                ok: false,
                err
            })
        }
        movie_name = movie
    })


    let funcion = new Funcion({
        day: body.day,
        hour: body.hour,
        movie_name: movie_name,
        room: body.room

    })
    funcion.save((err, funciondbb) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        return res.json({
            ok: true,
            funcion: funciondbb
        })
    })

})

module.exports = app