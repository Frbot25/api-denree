const { Router, request, response } = require('express');

const ProductController = require('./controllers/productController');
const UserController = require('./controllers/userController');

const router = Router();

// PRODUCT FINDALL
    router.get( "/", ProductController.findAllProduct);
// PRODUCT SAVE
    router.post('/product', ProductController.save);
// PRODUCT UPDATE
    router.post('/product/:id', ProductController.update);
// PRODUCT DELETE
    router.delete('/product/:id', ProductController.delete);

// USER LOGIN
    router.post('/login', UserController.login);
// USER SIGNUP
    router.post('/signup', UserController.signUp);
// USER UPDATE
    router.post('/user/:id', UserController.update);
//USER DELETE
    router.delete('/user/:id', UserController.deleteUserById);
module.exports = router;