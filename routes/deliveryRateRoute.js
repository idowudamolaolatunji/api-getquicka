//////////////////////////////////////////////////
//////////////////////////////////////////////////
const express = require('express');
const {
    createDeliveryRate, 
    getAllDeliveryRates, 
    getOneDeliveryRate, 
    updateDeliveryRate, 
    deleteDeliveryRate,
    deleteManyRates,
    getDeliveryRatesByStoreId,
    getDeliveryRatesForStore,
} = require('../controllers/deliveryRateController');
const { isAuthProtected, isRestricted } = require('../middlewares/protected');


//////////////////////////////////////////////////
//////////////////////////////////////////////////

const router = express.Router();

//////////////////////////////////////////////
//// CREATING AND CONFIGURING ROUTES ////
//////////////////////////////////////////////

// CREATE DELIVERY RATE, EDIT/UPDATE AND DELETE
router.post('/', isAuthProtected, createDeliveryRate);

router.get("/mine/delivery-rates", isAuthProtected, getDeliveryRatesForStore)

router.patch('/:id', isAuthProtected, updateDeliveryRate);
router.delete('/:id', isAuthProtected, deleteDeliveryRate)
router.delete("/delete-many", isAuthProtected, deleteManyRates);


// GET DELIVERY RATE(S)
router.get('/', getAllDeliveryRates);
router.get('/:id', getOneDeliveryRate);
router.get('/store/:id', getDeliveryRatesByStoreId);



//////////////////////////////////////////////
//// EXPORT ROUTER ////
//////////////////////////////////////////////
module.exports = router;