require('dotenv').config();
const { response } = require('express');
const express = require('express');
const { request } = require('http');
//const router = require('./app/router');

//sécurité:
const cors = require('cors');//protéger l'accès à notre API
//const bodySanitizer = require('./app/middlewares/body-sanitizer');//éviter attaques XSS

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
app.use(express.urlencoded({extended:false}));

//sécurité:
//app.use(bodySanitizer);
//autoriser toutes les adresses web
app.use(cors());

//app.use('/', router);
app.use( (request, response) =>{
    response.send('Hello world !')
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});