const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const _ = require('lodash');
const path = require('path');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const ingredientRoutes = require('./routes/ingredient.routes');
const recetteRoutes = require('./routes/recette.routes');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const {checkUser, requireAuth} = require('./middleware/auth.middlware');
const cors = require('cors');
const app = express();

//accès au back-end
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE,',
    'preflightContinue': false
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
});

//routes
app.use('/api/user', userRoutes);

//ingredient router
app.use('/api/ingredient', ingredientRoutes);

//recette router
app.use('/api/recette', recetteRoutes);

//accessible à tout le public
app.use(express.static('uploads'));

// enable files upload
app.use(fileUpload({
    createParentPath: true,
    limits: { 
        fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
    }, 
}));
app.use('/api/user/profile', userRoutes);

const public_path = path.join(__dirname, '../build');
app.use(express.static(public_path));
app.get("*", (_, res) =>{
    res.sendFile(path.join(public_path, 'index.html'))
});

//server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
});
