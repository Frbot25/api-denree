const { request, response } = require('express');
const Product = require('../models/product');

const ProductController = {
    findAllProduct: async (request, response) => {
        try {
            const product = await Product.findAllProducts();
            if (product === "") {

            }else {
                response.json({product});
            }
        }catch(error) {
            console.log(error);
            res.status(500).json(error.message);
        }   
    },
    save: async (request, response) => {
        try {
            const product = await new Product(request.body).save();
            response.status(201).json(product);
        }catch(error) {
            //lire l'erreur
           console.trace(error);
           //envoyer l'info au front
           response.status(500).json(error.message);
        }
    },
    update: async (request, response) => {
        try {
            const product = await new Product(request.body).update();
            response.status(201).json(product);
        }catch(error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    },
    delete: async (request, response) => {
        try {
            const id = parseInt(request.params.id,10);
            const product = await new Product(request.body).delete(id);
            response.status(201).json({success: true});
        }catch(error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    }
}

module.exports = ProductController;