const { Router, request, response } = require('express');

const ProductController = require('./controllers/productController');

const router = Router();

// ACCUEIL
router.get( "/", ProductController.findAllProduct);

// LOGIN
router.post('/product', ProductController.save);

//REGISTER
router.post('/product/:id', ProductController.update);

//DELETE
router.delete('/product/:id', ProductController.delete);

module.exports = router;