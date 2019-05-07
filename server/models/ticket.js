const mongoose = require('mongoose')
let Schema = mongoose.Schema

let ticketSchema = new Schema({
    id_funtion: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Ticket', ticketSchema)