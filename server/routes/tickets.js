const express = require('express')
let Ticket = require('../models/ticket')
let funcion = require('../models/funcion')
let { verificarToken } = require('../middlewares/auth')

const app = express()


function getfuncion(name) {
    funcion.find({ name }).exec((err, data) => {
        if (err) {
            return console.log('No existe')
        }
        return data
    })
}

app.post('/ticket', verificarToken, (req, res) => {
    let body = req.body
    let funcion = getfuncion(body.movie)
    console.log(funcion)
    let ticket = new Ticket({
        id_funtion: body.id,
        user_id: req.usuario._id,
        price: body.price

    })
    ticket.save((err, ticketDb) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!ticketDb) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            ticket: ticketDb
        });
    })
})

module.exports = app