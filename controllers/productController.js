const Store = require('../models/storeModel');
const Product = require('../models/productModel');
const ProductCollection = require('../models/productCollectionModel');
const refactory = require('../controllers/handleRefactory');
const { asyncWrapper } = require('../utils/handlers');
const { capitalizeFirstLetter } = require('../utils/helpers');
const sharp = require('sharp');


//////////////////////////////////////////////
//// PRODUCT CATEGORY LOGIC  ////
//////////////////////////////////////////////
exports.createProductCollection = refactory.createOneForStore(ProductCollection, 'collection')
exports.uploadProductCollectionImage = refactory.uploadOneImage(ProductCollection, 'collection');

exports.getAllProductCollections = refactory.getAll(ProductCollection, 'collections', {
    limit: 50, sort: {name: -1}
});

exports.updateProductCollection = refactory.updateOne(ProductCollection, 'collection');

exports.deleteProductCollection = refactory.deleteOne(ProductCollection, 'collection');



//////////////////////////////////////////////
//// PRODUCT LOGIC  ////
//////////////////////////////////////////////
exports.createProduct = refactory.createOneForStore(Product, 'product');

exports.getAllProducts = refactory.getAll(Product, 'products');
exports.getOneProduct = refactory.getOne(Product, 'product');

exports.uploadProductImages = asyncWrapper(async function(req, res) {
    const { id } = req.params;
    const reqFiles = req.files;
    
    const product = await Product.findById(id);
    if(!product) return res.json({ message: 'Product not found!' });

    const images = [];
    if (reqFiles && Array.isArray(reqFiles)) {
        for (const image of reqFiles) {
            const index = reqFiles.indexOf(image);

            const filename = `product-${product._id}-${Date.now()}-${index + 1}.jpeg`
            await sharp(image.buffer)
                .resize(950, 950)
                .toFormat('jpeg')
                .jpeg({ quality: 80 })
                .toFile(`public/assets/products/${filename}`)
            ;
            images.push(filename);
        }
    }

    product.images = images;
    await product.save({});

    res.status(200).json({
        status: 'success',
        message: 'Image upload successful'
    });
});

exports.getProductByProductId = asyncWrapper(async function(req, res) {
    const { productId } = req.params;

    const product = await Product.findOne({ productId });
    if(!product || product.stockAmount < 1) return res.json({
        message: 'Product sold out complete;ly!'
    });

    res.status(200).json({
        status: 'success',
        data: { product }
    });
});

exports.getProductInCollection = asyncWrapper(async function(req, res) {
    const { id } = req.params;

    const collection = await ProductCollection.findById(id);
    if(!collection) return res.json({ message: 'No collection by this ID' });

    const products = await Product.find({ collection: collection.name });
    if(!products || products.length < 1) return res.json({
        message: 'No product in this collection' 
    });

    res.status(200).json({
        status: 'success',
        data: { products }
    });
});

exports.updateProduct = refactory.updateOne(Product, 'product');
exports.deleteProduct = refactory.deleteOne(Product, 'product');