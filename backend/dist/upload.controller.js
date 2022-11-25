const UserModel = require('../models/user.model');

//permet de télécharger la photo de profile des uers
module.exports.postProfileUser = async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'Aucun fichier trouvé, choisisez un fichier et réessayer. '
      });
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let avatar = req.files.avatar;

      //Use the mv() method to place the file in the upload directory (i.e. "uploads")
      avatar.mv('./public/profile/' + avatar.name);

      //send response
      res.send({
        status: true,
        message: 'Le fichier est téléchargé avec succès !',
        data: {
          name: avatar.name,
          mimetype: avatar.mimetype,
          size: avatar.size
        }
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
  try {
    await UserModel.findByIdAndUpdate(req.body.userId, {
      $set: {
        picture: "./profile/" + avatar.name
      }
    }, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true
    }, (err, data) => {
      if (!err) return res.send(data);else return res.status(500).send({
        message: err
      });
    });
  } catch (err) {}
};