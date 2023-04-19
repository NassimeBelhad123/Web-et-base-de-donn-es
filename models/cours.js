const mongoose = require('mongoose')

const Schema = mongoose.Schema

const coursSchema = new Schema({
    
    nom:{type: String, required: true},
    discipline:{type: String, required: true},
    dateDebut: { type: Date, required:true},
    dateFin: { type: Date, required:true}
    
}
    
);

module.exports = mongoose.model("Cours", coursSchema)