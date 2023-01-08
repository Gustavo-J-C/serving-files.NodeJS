const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    Product.save({ title, imageUrl, description, price })
    res.redirect('/');
}

exports.postEditProduct = (req,res) => {
    const productId = req.body.productId;
    console.log(req.body);
    Product.editProduct(productId, {
        price: req.body.price, 
        title: req.body.title, 
        description: req.body.description, 
        imageUrl: req.body.imageUrl, 
        id: productId}
    );
    res.redirect('admin/products')
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if(!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    })
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin products',
            path: '/admin/products'
        });
    })
}

exports.postDeleteProduct = (req,res) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products')
}