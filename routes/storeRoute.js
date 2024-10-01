//////////////////////////////////////////////////
//////////////////////////////////////////////////
const express = require('express');
const storeController = require('../controllers/storeController');
const { isAuthProtected, isRestricted } = require('../middlewares/protected');
const { uploadSingleImage, resizeSingleLogoImage, resizeSingleBannerImage, resizeSingleGroupImage } = require('../middlewares/multer');


//////////////////////////////////////////////////
//////////////////////////////////////////////////

const router = express.Router();
const isRestrictedToAdmins = isRestricted(["admin", "moderator"])

//////////////////////////////////////////////
//// CREATING AND CONFIGURING ROUTES ////
//////////////////////////////////////////////

// GET STORE CATEGORIES, AND STORES IN CERTAIN CATEGORY
router.get('/category', storeController.getStoreCategories);
router.get('/category/:id', storeController.getStoresInCategory);

// STORE OWNERS CREATE STORE, AND UPLOAD IMAGES (LOGO / MAIN BANNER)
// router.post('/', isAuthProtected, storeController.createStore);
router.patch('/upload-logo', isAuthProtected, uploadSingleImage, resizeSingleLogoImage, storeController.uploadLogoImage);
router.patch('/upload-banner', isAuthProtected, uploadSingleImage, resizeSingleBannerImage, storeController.uploadBannerImage);

// LOAD STORE DATA
router.get('/load-store/:url', storeController.loadStoreByUrl);

// ADMIN EDIT/UPDATE AND DELETE STORE
router.get('/', isAuthProtected, isRestricted, storeController.getStores);
router.get('/:id', isAuthProtected, isRestricted, storeController.getStore);

// ADMINS CREATE CATEGORY, EDIT/UPDATE AND DELETE
router.post('/category', isAuthProtected, isRestrictedToAdmins, storeController.createStoreCategory);
// router.post('/category',  storeController.createStoreCategory);
router.patch('/category/upload-image', isAuthProtected, isRestrictedToAdmins, uploadSingleImage, resizeSingleGroupImage, storeController.uploadCategoryImage);
router.patch('/category/:id', isAuthProtected, isRestrictedToAdmins, storeController.updateCategory);
router.delete('/category/:id', isAuthProtected, isRestrictedToAdmins, storeController.deleteCategory);


//////////////////////////////////////////////
//// EXPORT ROUTER ////
//////////////////////////////////////////////
module.exports = router;