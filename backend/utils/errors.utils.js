module.exports.signUpErrors = (err) => {
    let errors = { nom:"", pseudo: "", email: "", password: "", telephone: "" }

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("nom"))
        errors.nom = "Ce nom est déjà enregistré";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
        errors.pseudo = "Ce pseudo est déjà enregistré";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email'))
        errors.email = "Cet email est déjà enregistré";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('telephone'))
        errors.telephone = "Ce numéro est déjà enregistré et doit faire au moins 12 caractères";

    if (err.message.includes('password'))
        errors.password = "Le mot de passe doit faire 6 caractères minmum";
    
    return errors;
};

module.exports.signInErrors = (err) => {
    let errors = { email: '', password: '' }

    if (err.message.includes('email'))
        errors.email = "Email inconnu";
    
    if (err.message.includes('password'))
        errors.password = "Le mot de passe ne correspond pas";

    return errors;
}

