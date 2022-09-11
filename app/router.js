const { Router, request, response } = require('express');

const router = Router();

// ACCUEIL
router.get( "/", (request, response) => {
    response.send('Accueil');
})

// LOGIN
router.get('/login', (request, response) => {
    response.send('Login');
})
//REGISTER
router.get('/register', (request, response) => {
    response.send('register');
})


module.exports = router;