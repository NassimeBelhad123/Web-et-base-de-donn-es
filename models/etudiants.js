const mongoose = require('mongoose')

const Schema = mongoose.Schema

const placeSchema = new Schema({
    numeroDA:{type: Int32Array, required: true},
    nom:{type: String, required: true},
    prenom:{type: String, required: true}
    
}
    
);

modulee.exports = mongoose.model("Professeur", placeSchema)