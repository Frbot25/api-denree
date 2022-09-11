const { Router, request, response } = require('express');



const router = Router();

// ACCUEIL
router.get( "/", (request, response) => {
    response.send('Accueil');
})

module.exports = router;