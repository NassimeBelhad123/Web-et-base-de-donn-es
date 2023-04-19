const { reponse } = require("express");
const { default: mongoose, mongo } = require("mongoose");
const {v4: uuidv4} = require("uuid");


const HttpErreur = require("../models/http-erreur");

const Cours = require("../models/cours")






const getCoursById = async (requete, reponse, next) =>{
    const coursId = requete.params.coursId;
    let cours;
    try {
      cours = await Cours.findById(coursId);
    } catch(err){
        return next(
             new HttpErreur("Erreur de la récupération du cours", 500)
        );
    }
    if (!cours){
        return next(new HttpErreur("Aucun cours trouvé par l'id fourni", 404));
    }

    reponse.json({ cours: cours.toObject({ getters: true}) });
};




const creerCours = async (requete, reponse, next) => {
    const { nom, discipline, dateDebut, dateFin, prof, listeEtudiants } = requete.body;
  
    const nouveauCours = new Cours({
      nom,
      discipline,
      dateDebut,
      dateFin,
      prof,
      listeEtudiants: []
    });
  
    try {
      await nouveauCours.save();
    } catch (err) {
      return next(new HttpErreur("Erreur de création du cours", 500));
    }
  
    reponse.status(201).json({ cours: nouveauCours });
  };
  





const updateCours = async (requete, reponse, next) => {
    const {nom, discipline, dateDebut, dateFin, prof, listeEtudiants} = requete.body;
    const coursId = requete.params.coursId;

    let cours;

    try{
        cours = await Cours.findById(coursId);
        cours.nom  = nom
        cours.discipline = discipline
        cours.dateDebut = dateDebut
        cours.dateFin = dateFin
        cours.prof = prof
        cours.listeEtudiants = listeEtudiants
        await cours.save()
        
    }catch{
        return next(
            new HttpErreur("Erreur lors de la mise a jour du cours", 500)
        );
    }
    reponse.status(200).json({ cours: cours.toObject({ getters: true})
});

        

        

       
};





const supprimerCours = async (requete, reponse, next) =>{

  const coursId = requete.params.coursId;

  let cours;
  try {
    cours = await Cours.findById(coursId);
  } catch (err) {
    return next(new HttpErreur("Erreur de la récupération du cours", 500));
  }

  if (!cours) {
    return next(new HttpErreur("Aucun cours trouvé par l'id fourni", 404));
  }

  try {
    await Cours.findByIdAndDelete(coursId);
  } catch (err) {
    return next(new HttpErreur("Erreur de suppression du cours", 500));
  }

  reponse.status(200).json({ message: "Cours supprimé" });

    
};

exports.getCoursById = getCoursById;
exports.creerCours = creerCours;
exports.updateCours = updateCours;
exports.supprimerCours = supprimerCours;