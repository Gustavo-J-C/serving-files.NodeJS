const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const p = path.join(path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

function getProductsFromFile(cb) {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
}

module.exports = {

    save: function save(prod) {
        const id = Math.random().toString();
        getProductsFromFile(products => {
            products.push({...prod, id});
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        })
    },
    deleteById: function (id) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            const updatedProducts = products.filter(p => p.id != id);
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if(!err) {
                    Cart.deleteProduct(id, product.price)
                }
            });
        })
    },
    editProduct: function editProduct(id, prod) {
        getProductsFromFile(products =>{
            const productIndex = products.findIndex(element => element.id == id);
            if (productIndex < 0) {
                return
            }
            products[productIndex] = prod;
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err);
            });
        }) 
    },
    fetchAll: function fetchAll(cb) {
        getProductsFromFile(cb);
    },
    findById: function findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    },
}