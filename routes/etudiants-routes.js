const express = require("express");

const controleurEtudiant = require("../controllers/etudiants-controleurs")
const router = express.Router();


router.get("/:etudiantId", controleurEtudiant.getEtudiantById);

router.post('/', controleurEtudiant.creerEtudiant);

router.patch('/:etudiantId', controleurEtudiant.updateEtudiant);

router.delete('/:etudiantId', controleurEtudiant.supprimerEtudiant);

module.exports = router;