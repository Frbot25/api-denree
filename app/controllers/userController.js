const User = require('../models/user');

const userController = {
    //Renvoyer les infos user suite au login - ou une erreur
    login: async (request, response) => {
        try {
            //récupérer les infos de login
            console.log("\n** Hello, je suis le controller : \n-> un user s'est connecté au client, je récupère les infos de login");
            const login = request.body;
            //authentification
            console.log('Je veux authentifier le user => je vais envoyer les infos au model pour comparaison\n');
            const user = await new User(login).findUser();
            response.send({user});
        } catch (error) {
            //lire l'erreur
            console.trace(error);
            //envoyer l'info au front
            response.status(500).json(error.message);
        }
    },
    signUp: async (request, response) => {
        try {
            let data = request.body;
            const user = await new User().signUp(data);
            console.log("\n>>> je suis de retour dans le controller voici ce que je reçois", user);
            response.send({user,});     
        } catch(error) {
            //lire l'erreur
            console.log("!!! Voici l'erreur dans le catch du controller: ",error.message);
            response.status(409).json(error);

        }
    },
    deleteUserById: async (request, response) => {
        try {
            const id = parseInt(request.params.id,10);
            console.log(id);
            const user = await new User(id).deleteUserById(id);
            response.status(201).json({success: true});
        } catch(error) {
           //lire l'erreur
           console.trace(error);
           //envoyer l'info au front
           response.status(500).json(error.message);
        }
    },
    update : async (request, response) => {
        try {
            let userDatas = {
                id : request.params.id,
            };
            //boucler sur les propriétés de request.body pour ne mettre à jour que celles qui ont été envoyées
            for (const key in request.body) {
                userDatas[key] = request.body[key]
            }
            console.log({userDatas});
            // UPDATE
            const user = await new User(userDatas).update();   
            console.log("\nupdateController >> 2) \\o/ tout s'est bien passé, j'en informe le client\n");
            //renvoyer un message au front lui signifiant que tout c'est bien passé
            response.status(201).json(user);
   
        } catch(error) {
           //lire l'erreur
           console.trace(error);
           //envoyer l'info au front
           response.status(500).json(error.message);
        }
    },
    
}

module.exports = userController;