const RecetteModel = require('../models/recette.model');
const ObjectID = require('mongoose').Types.ObjectId;

//env
module.exports.recettePost = async (req, res) => {
    const { nom, temps, nombrePersonne, difficultes, description, 
        prix, ingredient } = req.body
    //console.log(req.body);
    try {
        const recette = await RecetteModel.create({nom, temps, nombrePersonne, 
            difficultes, description, prix, ingredient  });
        res.status(201).json({ recette: recette._id});
    }
    catch (err){
        res.status(200).send({ err })
    }
}

//afficher tous les recettes
module.exports.getAllRecettes = async (req, res) => {
    const recettes = await RecetteModel.find().select();
    res.status(200).json(recettes);
}

// récupérer une recette
module.exports.recetteDetail = (req, res) =>{
    //console.log(req.params);
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('Id inconnu : ' + req.params.id)
    RecetteModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('Id inconnu : ' + err);
    }).select();
}


//modifier une recette
module.exports.updateRecette = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);
    try {
        const updateRecord = {
            nom: req.body.nom,
            temps: req.body.temps, 
            nombrePersonne: req.body.nombrePersonne, 
            difficultes: req.body.difficultes, 
            description: req.body.description, 
            prix: req.body.prix, 
            ingredient: req.body.ingredientsList
        };
        
        RecetteModel.findByIdAndUpdate(
            req.params.id,
            { $set: updateRecord },
            { new: true },
            (err, data) => {
                if (!err) res.send(data);
                else console.log("Erreur de mise à jour : " + err);
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err});
    }
}

//supprimer une recette
module.exports.deleteRecette = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);
    try {
        await RecetteModel.findByIdAndRemove({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Suppression réussie. "});
    } catch (err) {
        return res.status(500).json({ message: err});
    }
}

