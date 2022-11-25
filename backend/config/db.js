const mongoose = require("mongoose");


mongoose
    .connect(
        "mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.qwai2af.mongodb.net/symRecipe-project",
        {
            useNewUrlParser: true,
        }
    )
    .then(() => console.log("Connecté à MongoDb"))
    .catch((err) => console.log("Connection échouée", err));
