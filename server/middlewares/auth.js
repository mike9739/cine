const jwt = require('jsonwebtoken')

//========
//verificación de token
//=============

let verificarToken = (req, res, next) => {
    let token = req.get('Authorization')
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }
        req.usuario = decoded.usuario
        next()
    })

}

module.exports = {
    verificarToken
}