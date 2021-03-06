const express = require('express')
const Movie = require('../models/movies');

const app = express()
app.get('/movies', (req, res) => {
    let desde = req.query.desde || 0
    desde = Number(desde)
    let limite = req.query.limite || 5
    limite = Number(5)

    Movie.find({}).skip(desde).limit(limite).exec((err, movies) => {
        if (err) {
            return res.status(400).json({
                status: 'Fail',
                err
            })
        }
        Movie.countDocuments({}, (err, connteo) => {
            res.json({
                ok: true,
                movies,
                connteo
            })
        })
    })
})

app.post('/movies', (req, res) => {
    let body = req.body
    let movie = new Movie({
        movie_name: body.name,
        duration: body.duration,
        year: body.year,
        classification: body.classification,
        languages: body.languages,
        synopsis: body.synopsis
    })
    movie.save((err, moviedb) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })

        }
        return res.json({
            ok: true,
            movie: moviedb
        })
    })
})

module.exports = app