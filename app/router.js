const { Router, request, response } = require('express');

const ProductController = require('./controllers/productController');
const UserController = require('./controllers/userController');

const checkJwt = require('./middlewares/checkJwt');

const router = Router();

// PRODUCT FINDALL
    router.get( "/", ProductController.findAllProduct);
// PRODUCT SAVE
    router.post('/product', checkJwt, ProductController.save);
// PRODUCT UPDATE
    router.post('/product/:id',checkJwt, ProductController.update);
// PRODUCT DELETE
    router.delete('/product/:id',checkJwt, ProductController.delete);

// USER LOGIN
    router.post('/login', UserController.login);
// USER SIGNUP
    router.post('/signup', UserController.signUp);
// USER UPDATE
    router.post('/user/:id',checkJwt, UserController.update);
//USER DELETE
    router.delete('/user/:id',checkJwt, UserController.deleteUserById);
module.exports = router;