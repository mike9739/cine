const express = require('express')
const Room = require('../models/rooms')

const app = express()

app.get('/rooms', (req, res) => {
    let desde = req.query.desde || 0
    desde = Number(desde)
    let limite = req.query.limite || 5
    limite = Number(5)

    Room.find({}).skip(desde).limit(limite).exec((err, rooms) => {
        if (err) {
            return res.status(400).json({
                status: 'Fail',
                err
            })
        }
        Room.countDocuments({}, (err, connteo) => {
            res.json({
                ok: true,
                rooms,
                connteo
            })
        })
    })
})

app.post('/rooms', (req, res) => {
    let body = req.body
    let room = new Room({
        number_seats: body.number_seats,
        room_number: body.room_number
    })
    room.save((err, roomdb) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        return res.json({
            ok: true,
            room: roomdb
        })
    })
})

module.exports = app