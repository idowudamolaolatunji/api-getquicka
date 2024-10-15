//////////////////////////////////////////////////
//////////////////////////////////////////////////
const express = require('express');
const productController = require('../controllers/productController');
const { isAuthProtected, isRestricted } = require('../middlewares/protected');
const { uploadMultipleImage, uploadSingleImage, resizeSingleGroupImage } = require('../middlewares/multer');

//////////////////////////////////////////////////
//////////////////////////////////////////////////

const router = express.Router();

//////////////////////////////////////////////
//// CREATING AND CONFIGURING ROUTES ////
//////////////////////////////////////////////

// CREATE PRODUCT, EDIT/UPDATE AND DELETE
router.post('/', isAuthProtected, productController.createProduct);
router.post('/upload-image/:id', isAuthProtected, uploadMultipleImage, productController.uploadProductImages)
router.patch('/:id', isAuthProtected, productController.updateProduct);
router.delete('/:id', isAuthProtected, productController.deleteProduct);

// GET PRODUCT / PRODUCTS
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getOneProduct);
router.get('/:productId', productController.getProductByProductId);


// GET COLLECTION / COLLECTIONS
router.get('/collection/all', productController.getAllProductCollections);
router.get('/collection/product', productController.getProductInCollection);


// CREATE COLLECTION, EDIT/UPDATE AND DELETE
router.post('/collection/create', isAuthProtected, productController.createProductCollection);
router.post('/collection/upload-image/:id', isAuthProtected, uploadSingleImage, resizeSingleGroupImage, productController.uploadProductCollectionImage);
router.patch('/collection/:id', isAuthProtected, productController.updateProductCollection);
router.delete('/collection/:id', isAuthProtected, productController.deleteProductCollection);


//////////////////////////////////////////////
//// EXPORT ROUTER ////
//////////////////////////////////////////////
module.exports = router;