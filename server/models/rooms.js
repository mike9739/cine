const mongoose = require('mongoose')
let Schema = mongoose.Schema


let roomSchema = new Schema({
    number_seats: {
        type: Number,
        required: true
    },
    room_number: {
        type: Number,
        required: true
    }
})
module.exports = {
    roomSchema
}
module.exports = mongoose.model('Rooms', roomSchema)