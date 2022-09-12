const pool = require('../database');

class Product {
    constructor(obj ={}) {
        for (const propname in obj) {
            this[propname] = obj[propname];
        }
    }
    static async findAllProducts() {
        try {
            const { rows } = await pool.query('SELECT * FROM product');
            return rows.map(row => new Product(row));
        } catch(error) {
            console.log(error);
            throw new Error(error.detail ? error.detail : error.message);
        }
    }
    async save() {
        try {
            console.log(this);
            // insérer les valeurs avec une fonction new_product
            const {rows} = await pool.query('SELECT new_product($1) AS id', [this]);
            this.id = rows[0].id;
            

        }catch(error) {
            console.log('Erreur SQL', error.detail);
            //relancer l'erreur pout que le controller puisse l'attrapper et la renvoyer au front
            throw new Error(error.detail ? error.detail : error.message);
        }
        return this;
    }
    async update() {
        try {
            const {rows} = await pool.query('SELECT update_product($1) AS id', [this]);
            
        }catch(error){
            console.log('Erreur SQL', error.detail);
            //relancer l'erreur pout que le controller puisse l'attrapper et la renvoyer au front
            throw new Error(error.detail ? error.detail : error.message);
        }      
    }
    async delete(id) {
        try {
            const {rows} = await pool.query('DELETE FROM product WHERE id=$1', [id]);
            
        }catch(error){
            console.log('Erreur SQL', error.detail);
            //relancer l'erreur pout que le controller puisse l'attrapper et la renvoyer au front
            throw new Error(error.detail ? error.detail : error.message);
        }      
    }

}
module.exports = Product;