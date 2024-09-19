//////////////////////////////////////////////////
//////////////////////////////////////////////////
const express = require('express');
const {
    createShippingMethod, 
    getAllShippingMethod, 
    getOneShippingMethod, 
    updateShippingMethod, 
    deleteShippingMethod,
    getShippingMethodsByStoreId
} = require('../controllers/shippingMethodController');
const { isAuthProtected, isRestricted } = require('../middlewares/protected');



//////////////////////////////////////////////////
//////////////////////////////////////////////////

const router = express.Router();

//////////////////////////////////////////////
//// CREATING AND CONFIGURING ROUTES ////
//////////////////////////////////////////////

// CREATE SHIPPING METHOD, EDIT/UPDATE AND DELETE
router.post('/', isAuthProtected, createShippingMethod);
router.patch('/:id', isAuthProtected, updateShippingMethod);
router.delete('/:id', isAuthProtected, deleteShippingMethod)


// GET SHIPPING METHOD(S)
router.get('/', getAllShippingMethod);
router.get('/:id', getOneShippingMethod);
router.get('/store/:id', getShippingMethodsByStoreId);


//////////////////////////////////////////////
//// EXPORT ROUTER ////
//////////////////////////////////////////////
module.exports = router;