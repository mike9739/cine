const mongoose = require('mongoose')
const Movie = mongoose.model('Movies')
let Schema = mongoose.Schema

let funcionSchema = new Schema({
    day: {
        type: String,
        required: true
    },
    hour: {
        type: String,
        required: true
    },
    movie_name: {
        type: String,
        required: true
    },
    room: {
        type: Number,
        required: true
    }

})
module.exports = mongoose.model('Funciones', funcionSchema)