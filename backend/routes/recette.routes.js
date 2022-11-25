const router = require('express').Router();
const recetteController = require('../controllers/recette.controller');



router.post("/register", recetteController.recettePost);
router.get('/', recetteController.getAllRecettes);
router.get('/:id', recetteController.recetteDetail);
router.put('/:id', recetteController.updateRecette);
router.delete('/:id', recetteController.deleteRecette); 



module.exports = router;