const { reponse } = require("express");
const {v4: uuidv4} = require("uuid");


const HttpErreur = require("../models/http-erreur");


let PROFESSEURS = [
    {
        id: "u001",
        nom: "Veregus",
        prenom: "Fergus",
        cours: ["botanique", "vol de balais", "potions"],
    },
];




const getProfesseurById = (requete, reponse, next) =>{
    const ProfId = requete.params.ProfId;
    const prof = PROFESSEURS.find((prof) =>{
        return prof.id ===ProfId;
    });

    if (!prof){
        return next(new HttpErreur("Aucun prof trouvé par l'id fourni", 404));
    }

    reponse.json({ prof });
};




const creerProfesseur = ((requete, reponse, next) =>{

    const {nom, prenom, cours} = requete.body;
    console.log(requete.body);

    const nouveauProf = {
        id: uuidv4(),
        nom,
        prenom,
        cours : []
    }
    PROFESSEURS.push(nouveauProf);

    reponse.status(201).json({prof: nouveauProf});
})





const updateProfesseur = (requete, reponse, next) => {
    const {nom, prenom} = requete.body;
    const ProfId = requete.params.ProfId;

        const profModifiee = {...PROFESSEURS.find(prof => prof.id===ProfId)};
        const indiceProf = PROFESSEURS.findIndex(prof => prof.id === ProfId);

        profModifiee.nom = nom;
        profModifiee.prenom = prenom;

        PROFESSEURS[indiceProf] = profModifiee;

        reponse.status(200).json({prof:profModifiee})
};





const supprimerProfesseur = (requete, reponse, next) =>{

    const ProfId = requete.params.ProfId;
    PROFESSEURS = PROFESSEURS.filter(prof =>prof.id !== ProfId );
    reponse.status(200).json({message: "Professeur supprimé"});

    
};

exports.getProfesseurById = getProfesseurById;
exports.creerProfesseur = creerProfesseur;
exports.updateProfesseur = updateProfesseur;
exports.supprimerProfesseur = supprimerProfesseur;