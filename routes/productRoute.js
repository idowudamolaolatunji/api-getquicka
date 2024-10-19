//////////////////////////////////////////////////
//////////////////////////////////////////////////
const express = require('express');
const { uploadMultipleImage } = require('../middlewares/multer');
const productController = require('../controllers/productController');
const { isAuthProtected, isRestricted } = require('../middlewares/protected');

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
router.get('/all', productController.getAllProducts);
router.get('/mine/all', isAuthProtected, productController.getMyProducts);
router.get('/one/:id', productController.getOneProduct);
router.get('/one/id/:productId', productController.getProductByProductId);


//////////////////////////////////////////////
//// EXPORT ROUTER ////
//////////////////////////////////////////////
module.exports = router;