const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema()
let valid_classification = {
    values:['A','AA','B','C','D','R'],
    message:'no es {VALUE} clasificación valida'
}

let valid_languages ={
    values:['Esṕañol','Ingles','Frances','Alemán','Japones','Ruso'],
    message:'no es {VALUE} un idioma válido'    
}


let movieSchema = new Schema({
    movie_name:{
        type:String,
        required:[true,'El nombre de la película es obligatorio']
    },
    duration:{
        type:String,
        required:[true,'La duración es obligatoria']
    },
    year:{
        type:Number,
        required:[true,'El año es obligatorio']
    },
    classification:{
        type:String,
        enum: valid_classification,
        required:[true,'La clasificacón es obligatoria']
    },
    languages:{
        type:'String',
        enum:valid_languages,
        required:[true,'el idioma es obligatorio ']
    },
    synopsis:{
        type:String
    }
})

userSchema.plugin(uniqueValidator,{message : '{PATH}'})
module.exports = mongoose.model('Movies',movieSchema)
