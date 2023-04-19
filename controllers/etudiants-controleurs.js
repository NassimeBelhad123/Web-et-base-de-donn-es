const { reponse } = require("express");
const {v4: uuidv4} = require("uuid");


const HttpErreur = require("../models/http-erreur");


let ETUDIANTS = [
    {
        id: "m73",
        numeroDA: "1870874",
        nom: "Tony",
        prenom: "Montana"
    },
];




const getEtudiantById = (requete, reponse, next) =>{
    const etudiantId = requete.params.etudiantId;
    const etudiant = ETUDIANTS.find((etudiant) =>{
        return etudiant.id ===etudiantId;
    });

    if (!etudiant){
        return next(new HttpErreur("Aucun etudiant trouvé par l'id fourni", 404));
    }

    reponse.json({ etudiant });
};




const creerEtudiant = ((requete, reponse, next) =>{

    const {nom, prenom} = requete.body;
    console.log(requete.body);

    const nouvelEtudiant = {
        id: uuidv4(),
        numeroDA,
        nom,
        prenom
        }
    ETUDIANTS.push(nouvelEtudiant);

    reponse.status(201).json({etudiant: nouvelEtudiant});
})





const updateEtudiant = (requete, reponse, next) => {
    const {nom, prenom, numeroDA} = requete.body;
    const etudiantId = requete.params.etudiantId;

        const etudiantModifiee = {...ETUDIANTS.find(etudiant => etudiant.id===etudiantId)};
        const indiceEtudiant = ETUDIANTS.findIndex(etudiant => etudiant.id === etudiantId);

        etudiantModifiee.nom = nom;
        etudiantModifiee.prenom = prenom;
        etudiantModifiee.numeroDA = numeroDA;

        ETUDIANTS[indiceEtudiant] = etudiantModifiee;

        reponse.status(200).json({etudiant:etudiantModifiee})
};





const supprimerEtudiant = (requete, reponse, next) =>{

    const etudiantId = requete.params.etudiantId;
    ETUDIANTS = ETUDIANTS.filter(etudiant =>etudiant.id !== etudiantId );
    reponse.status(200).json({message: "Etudiant supprimé"});

    
};

exports.getEtudiantById = getEtudiantById;
exports.creerEtudiant = creerEtudiant;
exports.updateEtudiant = updateEtudiant;
exports.supprimerEtudiant = supprimerEtudiant;