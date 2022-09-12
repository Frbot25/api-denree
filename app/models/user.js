const pool = require('../database');
const bcrypt = require('bcrypt');

class User {
    constructor(obj ={}) {
        for (const propname in obj) {
            this[propname] = obj[propname];
        }
    }
    async findUser() {
        try {
            //comparer l'email de connexion avec la DB dans la table user
            console.log("** Coucou! Je suis findUser du model User.\nJe compare l'email envoyé par le client avec celui de la DB");
            const { rows } = await pool.query(`SELECT * FROM "user" WHERE id=(SELECT id FROM "user" WHERE email = $1);`, [this.email]);//this vient du constructeur
            console.log(rows);
            //stocker l'id trouvé dans la table user
            const id = rows[0].id;
            console.log("J'ai trouvé le user" + id );
            if (!rows[0].id) {
                console.log("les emails ne correspondent pas, je renvoie l'erreur au client sans préciser la cause pour des raisons de sécurité");
                throw new Error('Identification failed');
            }
            //vérifier que les mots de passe correspondent
            console.log("Maintenant je vérifie que les mots de passe correspondent\n...");
            const isValid = await bcrypt.compare(this.password, rows[0].password);
                if (!isValid) {
                    console.log("ce n'est pas bon, on renvoie une erreur au client sans préciser la raison par sécurité");
                    throw new Error('Identification failed');
                }
            console.log("vérif ok!\n");
            const data = {
                email: rows[0].email,
                username: rows[0].user_name,
                user_id: rows[0].id
            }
            return data;
        } catch(error) {
            console.log(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }
    async signUp(data) {
        try {
            
            const {email, password, user_name} = data;
            // hash du password (obligatoire à cause de joi)
            let saltRounds = await bcrypt.genSalt(10);
            let HashedPassword = await bcrypt.hash(password, saltRounds);
            console.log("je hash le password", {HashedPassword});
            const {rows} = await pool.query('INSERT INTO "user" (email, password, user_name, role_id) VALUES ($1, $2, $3, $4) RETURNING *', [
                email,
                HashedPassword,
                user_name,
                1
            ]);
            console.log("\n voici le résultat",rows[0]);
                // creer un user pour securiser
                const userSecure = {
                id: rows[0].id,
                username: data.user_name,
                email: data.email,
                //id du rôle par défaut (utilisateur)
                role_id: rows[0].role_id,
                createdAt: rows[0].createat
            }
            console.log("\n et mon user sécurisé qui va être renvoyé au controller", {userSecure});
            
            return userSecure;
            
  
        } catch (persError) {
            //voir l'erreur en console
           console.log("***\ndans le catch du model");
           //console.log(error.message);
            console.log(persError);
            //renvoyer l'erreur au front
            throw new Error(persError);
        }
    }
    async deleteUserById(id) {
        try {
              await pool.query('DELETE FROM "user" WHERE id =$1', [id])
        } catch (error) {
            //voir l'erreur en console
            console.trace(error);
            //renvoyer l'erreur au front
            throw new Error(error.detail ? error.detail : error.message);
        }
    }
    async update() {
        try {
            //bcrypt sur le password s'il existe
            if (this.password) {
                console.log("update >> --> il y a un password, je le crypte et je remplace celui qui se trouve dans this");
                const passwordCrypted = await bcrypt.hash(this.password, 10);
                this.password = passwordCrypted;
                console.log('update : nouveau this= ',this);
            }
            //updater l'enregistrement 
            const {rows} = await pool.query('SELECT * FROM update_user($1)', [this]);
            console.log({rows});
            let userSecure = {
                id: this.id,
                user_name: this.user_name,
                email: this.email,
            };
            console.log({userSecure: userSecure});
            //renvoyer le user au controller            
            return userSecure;

        }catch(error){
            console.log('Erreur SQL', error.detail);
            //relancer l'erreur pour que le controller puisse l'attrapper et la renvoyer au front
            throw new Error(error.detail ? error.detail : error.message);
        }    
    }
}
module.exports = User;