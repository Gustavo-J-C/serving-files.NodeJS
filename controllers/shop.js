const Product = require("../models/product");

exports.getProducts = async (req, res, next) => {
    const products = Product.fetchAll(products => {
        console.log(products);
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All products',
            path: '/products',
        });
    })
}

exports.getIndex = async (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    })
}

exports.getCart = async (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Your cart',
        path: '/cart',
    })
}

exports.getOrders = async (req, res, next) => {
    res.render('shop/ordes', {
        pageTitle: 'Your cart',
        path: '/cart',
    })
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    })
}