const Product = require("../models/product");


exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formCss: true,
        productCss: true,
        ActiveAddProduct: true
    });
};

exports.postAddProduct = (req, res, next) => {
    Product.save({ title: req.body.title })
    res.redirect('/');
}

exports.getProducts = async (req, res, next) => {
    const products = Product.fetchAll(products => {
        console.log(products);
        res.render('shop', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCss: true
        });
    })
}