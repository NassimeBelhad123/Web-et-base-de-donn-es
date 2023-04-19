const express = require("express");

const controleurProf = require("../controllers/professeurs-controleurs")
const router = express.Router();


router.get("/:ProfId", controleurProf.getProfesseurById);

router.post('/', controleurProf.creerProfesseur);

router.patch('/:ProfId', controleurProf.updateProfesseur);

router.delete('/:ProfId', controleurProf.supprimerProfesseur);

module.exports = router;