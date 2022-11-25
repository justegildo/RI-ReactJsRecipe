const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
};

module.exports.signUp = async (req, res) => {
    const {nom, pseudo, email, password, telephone, typeUser} = req.body
    try {
        const user = await UserModel.create({nom, pseudo, email, password, telephone, typeUser });
        res.status(201).json({ user: user._id});
    }
    catch (err){
        const errors = signUpErrors(err);
        res.status(200).send({ errors })
    }
} 

module.exports.signIn = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge});
        res.status(200).json({ user: user, token: token})
    } catch (err) {
        const errors = signInErrors(err);
        res.status(201).json({ errors})
    }
}

module.exports.authenticateToken = async (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
        if(error){
            return res.sendStatus(401);
        }
        req.user = user;
        next();
    })
}

//deconnexion 
module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}
