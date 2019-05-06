const express = require('express')
const _ = require('underscore')
const bcrypt = require('bcrypt')
const User = require('../models/users');
const { verificarToken } = require('../middlewares/auth')

const app = express()

app.get('/', (req, res) => {
    res.json('Holas')
})
app.get('/usuarios', verificarToken, (req, res) => {
    let desde = req.query.desde || 0
    desde = Number(desde)
    let limite = req.query.limite || 5
    limite = Number(5)

    User.find({}).skip(desde).limit(limite).exec((err, usuarios) => {
        if (err) {
            return res.status(400).json({
                status: 'Fail',
                err
            })
        }
        User.countDocuments({}, (err, connteo) => {
            res.json({
                ok: true,
                usuarios,
                connteo
            })
        })
    })

})
app.post('/usuarios', verificarToken, (req, res) => {
    let body = req.body
    let usuario = new User({
        name: body.name,
        surname: body.surname,
        email: body.email,
        role: body.role,
        password: bcrypt.hashSync(body.password, 10)

    });
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                status: 'Fail',
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })


})
app.put('/usuario/:id', verificarToken, function(req, res) {
    let id = req.params.id

    let body = _.pick(req.body, ['nombre', 'email', 'surname', 'state'])

    User.findOneAndUpdate(id, body, { new: true, useFindAndModify: false, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!id) {
            return res.status(404).json({
                ok: false,
                message: 'El id no existe'
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })

})
app.delete('/usuario/:id', verificarToken, (req, res) => {
    let id = req.params.id
    User.findOneAndDelete(id, (err, deletedUser) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!deletedUser) {
            return res.status(404).json({
                ok: false,
                message: 'El id no existe'
            })

        }
        res.json({
            ok: true,
            usuario: deletedUser
        })
    })
})
app.put('/userstate/:id', verificarToken, (req, res) => {
    let id = req.params.id;
    let newState = {
        state: false
    }
    User.findOneAndUpdate(id, newState, { new: true, useFindAndModify: false }, (err, newState) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        return res.json({
            ok: true,
            state: !newState
        })
    })

})


module.exports = app