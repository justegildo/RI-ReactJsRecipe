const IngredientModel = require('../models/ingredient.model');
const ObjectID = require('mongoose').Types.ObjectId;

//env
module.exports.ingredientPost = async (req, res) => {
    const { nom, prix, quantite } = req.body
    //console.log(req.body);
    try {
        const ingredient = await IngredientModel.create({nom, prix, quantite });
        res.status(201).json({ ingredient: ingredient._id});
    }
    catch (err){
        res.status(200).send({ err })
    }
}

//afficher tous les ingredients
module.exports.getAllIngredients = async (req, res) => {
    const ingredients = await IngredientModel.find().select();
    res.status(200).json(ingredients);
}

// récupérer un utilisateur
module.exports.ingredientDetail = (req, res) =>{
    //console.log(req.params);
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('Id inconnu : ' + req.params.id)
    IngredientModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('Id inconnu : ' + err);
    }).select();
}


//modifier un ingredient
module.exports.updateIngredient = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);
    try {
        const updateRecord = {
            nom: req.body.nom,
            prix: req.body.prix,
            quantite: req.body.quantite
        };

        IngredientModel.findByIdAndUpdate(
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

//supprimer un ingredient
module.exports.deleteIngredient = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);
    try {
        await IngredientModel.findByIdAndRemove({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Suppression réussie. "});
    } catch (err) {
        return res.status(500).json({ message: err});
    }
}

