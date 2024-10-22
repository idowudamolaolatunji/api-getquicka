const Store = require('../models/storeModel');
const Product = require('../models/productModel');
const ProductCollection = require('../models/productCollectionModel');
const refactory = require('../controllers/handleRefactory');
const { asyncWrapper } = require('../utils/handlers');
const sharp = require('sharp');


//////////////////////////////////////////////
//// PRODUCT CATEGORY LOGIC  ////
//////////////////////////////////////////////

// CREATE PRODUCT COLLECTION BY THE STORE OWNER (PROTECTED)
exports.createProductCollection = refactory.createOneForStore(ProductCollection, "collection")

// UPLOAD COLLECTION IMAGE (PROTECTED)
exports.uploadProductCollectionImage = refactory.uploadOneImage(ProductCollection, "collection");

// GET ALL PRODUCTCOLLECTION BY THE STORE OWNER (PROTECTED)
exports.getMyProductCollections = refactory.getItemsByStoreOwner(ProductCollection, "collections")

// UPDATE COLLECTION (PROTECTED)
exports.updateProductCollection = refactory.updateOne(ProductCollection, "collection");

// DELETE COLLECTION (PROTECTED)
exports.deleteProductCollection = refactory.deleteOne(ProductCollection, "collection");

// DELETE COLLECTION (PROTECTED)
exports.deleteManyProductCollections = refactory.deleteManyForStore(ProductCollection, "collections");



//////////////////////////////////////////////
//// PRODUCT LOGIC  ////
//////////////////////////////////////////////

// CREAYE NEW PRODUCT BY STORE OWNER (PROTECTED)
exports.createProduct = refactory.createOneForStore(Product, 'product');

// ADMINS GET ALL PRODUCT (PROTECTED)
exports.getAllProducts = refactory.getAll(Product, 'products');

// GET ONE PRODUCT BY ID
exports.getOneProduct = refactory.getOne(Product, 'product');

// GET ALL PRODUCTS BY STORE OWNER (PROTECTED)
exports.getMyProducts = refactory.getItemsByStoreOwner(Product, 'products');

// UPLOAD MULTITLE PRODUCT IMAGES BY STORE OWNER (PROTECTED)
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
            images.push(`/assets/products/${filename}`);
        }
    }

    product.images = images;
    await product.save({});

    res.status(200).json({
        status: 'success',
        message: 'Image upload successful'
    });
});

// UPDATE PRODUCT BY ID (PROTECTED)
exports.updateProduct = refactory.updateOne(Product, 'product');

// DELETE PRODUCT BY ID (PROTECTED)
exports.deleteProduct = refactory.deleteOne(Product, 'product');

// DELETE MANY PRODUCT (PROTECTED)
exports.deleteManyProducts = refactory.deleteManyForStore(Product, 'products');

// GET PRODUCT BY COLLECTION SLUG
exports.getProductInCollection = asyncWrapper(async function(req, res) {
    const { slug } = req.params;

    const collection = await ProductCollection.findOne({ slug });
    if(!collection) return res.json({ message: 'No collection found by this Id!' });

    const products = await Product.find({ collection: collection.name });
    if(!products || products.length < 1) return res.json({
        message: 'No product in this collection'
    });

    res.status(200).json({
        status: 'success',
        data: { products }
    });
});