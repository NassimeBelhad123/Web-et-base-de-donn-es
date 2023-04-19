const mongoose = require('mongoose')

const Schema = mongoose.Schema

const placeSchema = new Schema({
    nom:{type: String, required: true},
    prenom:{type: String, required: true},
    cours:{type: String, required: true}
}
    
);

modulee.exports = mongoose.model("Professeur", placeSchema)