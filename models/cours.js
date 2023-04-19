const mongoose = require('mongoose')

const Schema = mongoose.Schema

const placeSchema = new Schema({
    
    nom:{type: String, required: true},
    discipline:{type: String, required: true},
    dateDebut: { type: Date, required:true},
    dateFin: { type: Date, required:true}
    
}
    
);

modulee.exports = mongoose.model("Professeur", placeSchema)