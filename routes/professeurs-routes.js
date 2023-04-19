const express = require("express");

const controleurProf = require("../controllers/professeurs-controleurs")
const router = express.Router();


router.get("/:profId", controleurProf.getProfById);

router.post('/', controleurProf.creerProf);

router.patch('/:profId', controleurProf.updateProf);

router.delete('/:profId', controleurProf.supprimerProf);

module.exports = router;