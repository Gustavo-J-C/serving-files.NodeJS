const fs = require('fs');
const path = require('path')

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

    save: function save(title) {
        getProductsFromFile(products => {
            products.push(title);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        })
    },
    fetchAll: function fetchAll(cb) {
        getProductsFromFile(cb);
    }
}