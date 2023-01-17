const db = require('../util/database')

const Cart = require('./cart');

module.exports = {

    save: function (prod) {
        return db.execute(
            `INSERT INTO products (imageUrl, title, price, description) VALUES ('${prod.imageUrl}', '${prod.title}', ${prod.price}, '${prod.description}')`)
    },
    deleteById: function (id) {
        
    },
    editProduct: function (id, prod) {
         
    },
    fetchAll: function fetchAll() {
        try {
            return db.execute('select * from products')
        } catch (error) {
            console.log(error);
        }
    },
    findById: function (id) {
        return db.execute(`select * from products where products.id = ${id}`)
    },
}