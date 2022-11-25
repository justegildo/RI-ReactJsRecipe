const router = require('express').Router();
const ingredientController = require('../controllers/ingredient.controller');



router.post("/register", ingredientController.ingredientPost);
router.get('/', ingredientController.getAllIngredients);
router.get('/:id', ingredientController.ingredientDetail);
router.put('/:id', ingredientController.updateIngredient);
router.delete('/:id', ingredientController.deleteIngredient); 



module.exports = router;