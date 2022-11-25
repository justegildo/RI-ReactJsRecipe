const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;


//récupérer tous les utilisateurs
module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}

// récupérer un utilisateur
module.exports.userInfo = (req, res) =>{
    //console.log(req.params);
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('Id inconnu : ' + req.params.id)
    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('Id inconnu : ' + err);
    }).select('-password');
}


//modifier les informations d'un utilisateur
module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);
    try {
        const updateRecord = {
            nom: req.body.nom,
            pseudo: req.body.pseudo,
            email: req.body.email,
            telephone: req.body.telephone,
            typeUser: req.body.typeUser,
        };
    
        UserModel.findByIdAndUpdate(
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

//supprimer un utilisateur
module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);
    try {
        await UserModel.findByIdAndRemove({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Suppression réussie. "});
    } catch (err) {
        return res.status(500).json({ message: err});
    }
}

