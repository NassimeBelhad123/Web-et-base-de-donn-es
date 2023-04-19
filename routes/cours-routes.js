const express = require("express");

const controleurCours = require("../controllers/cours-controleurs")
const router = express.Router();


router.get("/:coursId", controleurCours.getCoursById);

router.post('/', controleurCours.creerCours);

router.patch('/:coursId', controleurCours.updateCours);

router.delete('/:coursId', controleurCours.supprimerCours);

module.exports = router;