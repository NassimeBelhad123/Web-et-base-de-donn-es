const mongoose = require('mongoose')

const Schema = mongoose.Schema

const placeSchema = new Schema({
    
    numeroDA:{type: Number, required: true},
    nom:{type: String, required: true},
    prenom:{type: String, required: true},
    listeCours: {type: [String], default: [] }
    
}
    
);

module.exports = mongoose.model("Etudiant", placeSchema)