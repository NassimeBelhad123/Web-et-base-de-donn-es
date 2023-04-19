const { reponse } = require("express");
const { default: mongoose, mongo } = require("mongoose");
const {v4: uuidv4} = require("uuid");


const HttpErreur = require("../models/http-erreur");

const Etudiant = require("../models/etudiants");






const getEtudiantById = async (requete, reponse, next) =>{
    const etudiantId = requete.params.etudiantId;
    let etudiant;
    try {
      etudiant = await Etudiant.findById(etudiantId);
    } catch(err){
        return next(
             new HttpErreur("Erreur de la récupération de l'étudiant", 500)
        );
    }
    if (!etudiant){
        return next(new HttpErreur("Aucun étudiant trouvé par l'id fourni", 404));
    }

    reponse.json({ etudiant: etudiant.toObject({ getters: true}) });
};




const creerEtudiant = async (requete, reponse, next) => {
    const { numeroDA, nom, prenom, listeCours } = requete.body;
  
    const nouvelEtudiant = new Etudiant({
      numeroDA,
      nom,
      prenom,
      listeCours: []
    });
  
    try {
      await nouvelEtudiant.save();
    } catch (err) {
      return next(new HttpErreur("Erreur de création de l'étudiant", 500));
    }
  
    reponse.status(201).json({ etudiant: nouvelEtudiant });
  };
  





const updateEtudiant = async (requete, reponse, next) => {
    const {numeroDA, nom, prenom, listeCours} = requete.body;
    const etudiantId = requete.params.etudiantId;

    let etudiant;

    try{
        etudiant = await Etudiant.findById(etudiantId);
        etudiant.numeroDA  = numeroDA
        etudiant.nom = nom
        etudiant.prenom = prenom
        etudiant.listeCours = listeCours
        await etudiant.save()
        
    }catch{
        return next(
            new HttpErreur("Erreur lors de la mise a jour de l'étudiant", 500)
        );
    }
    reponse.status(200).json({ etudiant: etudiant.toObject({ getters: true})
});

        

        

       
};





const supprimerEtudiant = async (requete, reponse, next) =>{

  const etudiantId = requete.params.etudiantId;

  let etudiant;
  try {
    etudiant = await Etudiant.findById(etudiantId);
  } catch (err) {
    return next(new HttpErreur("Erreur de la récupération de l'étudiant", 500));
  }

  if (!etudiant) {
    return next(new HttpErreur("Aucun étudiant trouvé par l'id fourni", 404));
  }

  try {
    await Etudiant.findByIdAndDelete(etudiantId);
  } catch (err) {
    return next(new HttpErreur("Erreur de suppression de l'étudiant", 500));
  }

  reponse.status(200).json({ message: "Étudiant supprimé" });

    
};

exports.getEtudiantById = getEtudiantById;
exports.creerEtudiant = creerEtudiant;
exports.updateEtudiant = updateEtudiant;
exports.supprimerEtudiant = supprimerEtudiant;