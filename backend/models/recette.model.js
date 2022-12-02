const mongoose = require('mongoose');


const recetteSchema = new mongoose.Schema(
    {
        nom: {
            type: String,
            required: false,
            minlength: 5,
            maxlength: 50,
            trim: true
        },
        temps: {
            type: String,
            required: false,
            minlength: 2,
            trim: true,
        },
        nombrePersonne: {
            type: Number,
            required: false,
            min: 1,
            trim: true,
        },
        difficultes: {
            type: String,
            required: false,
            minlength: 2,
            trim: true,
        },
        description: {
            type: String,
            required: false,
            minlength: 2,
            trim: true,
        },
        prix: {
            type: String,
            required: false,
            minlength: 2,
            trim: true,
        },
        dateCreation: {
            type: Date,
            default: Date.now
        },
        dateUpdate: {
            type: Date,
            default: Date.now,
        },
        ingredient: {
                type: [String],
                required: true,
                trim: true
        } 
        
    }
);

const RecetteModel = mongoose.model('recette', recetteSchema);

module.exports = RecetteModel;
