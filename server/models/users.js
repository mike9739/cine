const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


let Schema = mongoose.Schema
let validroles = {
    values: ['ADMIN_ROLE','USER_ROLE'],
    message: '{VALUE}  no es un rol valido'
}

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    surname: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: validroles
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});
userSchema.methods.toJSON = function() {
    let user = this
    let userObject = user.toObject();
    delete userObject.password;
    return userObject
}
userSchema.plugin(uniqueValidator,{message : '{PATH}'})
module.exports = mongoose.model('User',userSchema)