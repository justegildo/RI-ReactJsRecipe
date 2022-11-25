const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const uploadController = require('../controllers/upload.controller');
const multer = require("multer");
const upload = multer();

//auth
router.post("/register", authController.signUp);
router.post('/login', authController.signIn);
router.get('/me', authController.authenticateToken, (req, res) => {
    res.send(req.user);
});

router.get('/logout', authController.logout);


//user display : 'block'
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

//user profile
router.post('/upload-profile', uploadController.postProfileUser);


module.exports = router;