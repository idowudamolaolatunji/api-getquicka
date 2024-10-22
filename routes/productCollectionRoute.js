
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


// GET COLLECTION / COLLECTIONS
router.get('/mine/collections', isAuthProtected, productController.getMyProductCollections);
router.get('/products', productController.getProductInCollection);


// CREATE COLLECTION, EDIT/UPDATE AND DELETE
router.post('/', isAuthProtected, productController.createProductCollection);
router.post('/upload-image/:id', isAuthProtected, uploadSingleImage, resizeSingleGroupImage, productController.uploadProductCollectionImage);
router.patch('/:id', isAuthProtected, productController.updateProductCollection);
router.delete('/:id', isAuthProtected, productController.deleteProductCollection);


//////////////////////////////////////////////
//// EXPORT ROUTER ////
//////////////////////////////////////////////
module.exports = router;