const { reponse } = require("express");
const {v4: uuidv4} = require("uuid");


const HttpErreur = require("../models/http-erreur");


let COURS = [
    {
        id: "t91",
        nom: "Sorts d'auto-défense",
        discipline:"Magie",
        dateDebut: "2023-01-16",
        dateFin: "2023-05-17"
    },
];




const getCoursById = (requete, reponse, next) =>{
    const coursId = requete.params.coursId;
    const cours = COURS.find((cours) =>{
        return cours.id ===coursId;
    });

    if (!cours){
        return next(new HttpErreur("Aucun cours trouvé par l'id fourni", 404));
    }

    reponse.json({ cours });
};




const creerCours = ((requete, reponse, next) =>{

    const {nom, discipline, dateDebut, dateFin} = requete.body;
    console.log(requete.body);

    const nouveauCours = {
        id: uuidv4(),
        nom,
        discipline,
        dateDebut, 
        dateFin
        }
    COURS.push(nouveauCours);

    reponse.status(201).json({cours: nouveauCours});
})





const updateCours = (requete, reponse, next) => {
    const {nom, discipline} = requete.body;
    const coursId = requete.params.coursId;

        const coursModifiee = {...COURS.find(cours => cours.id===coursId)};
        const indiceCours = COURS.findIndex(cours => cours.id === coursId);

        coursModifiee.nom = nom;
        coursModifiee.discipline = discipline;
        coursModifiee.dateDebut = dateDebut;
        coursModifiee.dateFin = dateFin

        COURS[indiceCours] = coursModifiee;

        reponse.status(200).json({cours:coursModifiee})
};





const supprimerCours = (requete, reponse, next) =>{

    const coursId = requete.params.coursId;
    COURS = COURS.filter(cours =>cours.id !== coursId );
    reponse.status(200).json({message: "Cours supprimé"});

    
};

exports.getCoursById = getCoursById;
exports.creerCours = creerCours;
exports.updateCours = updateCours;
exports.supprimerCours = supprimerCours;