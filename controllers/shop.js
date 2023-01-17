const Cart = require("../models/cart");
const product = require("../models/product");
const Product = require("../models/product");

exports.getProducts = async (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/product-list', {
                prods: rows,
                pageTitle: 'All products',
                path: '/products',
            })
        })
        .catch(err => console.log(err))
}

exports.getProduct = async (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId) 
        .then(([rows, fieldData]) => {
            res.render('shop/product-detail', {
                product: rows[0],
                pageTitle: rows[0].title,
                path: '/products'
            });
            console.log(rows);
        })
        .catch(err => console.log(err))
}

exports.getIndex = async (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/index', {
                prods: rows,
                pageTitle: 'Shop',
                path: '/'
            })
        })
        .catch(err => console.log(err));
};

exports.getCart = async (req, res, next) => {
    Cart.getProducts(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (const product of products) {
                const cartProductData = cart?.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({ productData: product, qty: cartProductData.qty });
                }
            }
            res.render('shop/cart', {
                products: cartProducts,
                pageTitle: 'Your cart',
                path: '/cart',
            })
        })
    })
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    })
    res.redirect('/cart');
};

exports.getOrders = async (req, res, next) => {
    res.render('shop/orders', {
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

exports.postCartDeleteProduct = (req, res) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    })
}