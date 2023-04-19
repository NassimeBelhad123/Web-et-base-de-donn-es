const { reponse } = require("express");
const { default: mongoose, mongo } = require("mongoose");
const {v4: uuidv4} = require("uuid");


const HttpErreur = require("../models/http-erreur");

const Prof = require("../models/professeurs")






const getProfById = async (requete, reponse, next) =>{
    const profId = requete.params.profId;
    let prof;
    try {
      prof = await Prof.findById(profId);
    } catch(err){
        return next(
             new HttpErreur("Erreur de la récupération du professeur", 500)
        );
    }
    if (!prof){
        return next(new HttpErreur("Aucun prof trouvé par l'id fourni", 404));
    }

    reponse.json({ prof: prof.toObject({ getters: true}) });
};




const creerProf = async (requete, reponse, next) => {
    const { nom, prenom, listeCours } = requete.body;
  
    const nouveauProf = new Prof({
      nom,
      prenom,
      listeCours: []
    });
  
    try {
      await nouveauProf.save();
    } catch (err) {
      return next(new HttpErreur("Erreur de création du professeur", 500));
    }
  
    reponse.status(201).json({ prof: nouveauProf });
  };
  





const updateProf = async (requete, reponse, next) => {
    const {nom,  prenom, listeCours} = requete.body;
    const profId = requete.params.profId;

    let prof;

    try{
        prof = await Prof.findById(profId);
        prof.nom  = nom
        prof.prenom = prenom
        prof.listeCours = listeCours
        await prof.save()
        
    }catch{
        return next(
            new HttpErreur("Erreur lors de la mise a jour du professeur", 500)
        );
    }
    reponse.status(200).json({ prof: prof.toObject({ getters: true})
});

        

        

       
};





const supprimerProf = async (requete, reponse, next) =>{

  const profId = requete.params.profId;

  let prof;
  try {
    prof = await Prof.findById(profId);
  } catch (err) {
    return next(new HttpErreur("Erreur de la récupération du professeur", 500));
  }

  if (!prof) {
    return next(new HttpErreur("Aucun cours trouvé par l'id fourni", 404));
  }

  try {
    await Prof.findByIdAndDelete(profId);
  } catch (err) {
    return next(new HttpErreur("Erreur de suppression du professeur", 500));
  }

  reponse.status(200).json({ message: "Professeur supprimé" });

    
};

exports.getProfById = getProfById;
exports.creerProf = creerProf;
exports.updateProf = updateProf;
exports.supprimerProf = supprimerProf;