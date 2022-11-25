const mongoose = require('mongoose');


const ingredientSchema = new mongoose.Schema(
    {
        nom: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50,
            trim: true
        },
        prix: {
            type: String,
            required: true,
            minlength: 2,
            trim: true,
        },
        quantite: {
            type: String,
            required: true,
            minlength: 2,
            trim: true,
        },
        dateCreation: {
            type: Date,
            default: Date.now,

        }
    }
);

const IngredientModel = mongoose.model('ingredient', ingredientSchema);

module.exports = IngredientModel;
