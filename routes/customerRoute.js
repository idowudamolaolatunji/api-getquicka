//////////////////////////////////////////////////
//////////////////////////////////////////////////
const express = require('express');
const customerController = require('../controllers/customerController');
const { isAuthProtected, isRestricted } = require('../middlewares/protected');

//////////////////////////////////////////////////
//////////////////////////////////////////////////
const router = express.Router();

//////////////////////////////////////////////
//// CREATING AND CONFIGURING ROUTES ////
//////////////////////////////////////////////

router.post("/", isAuthProtected, customerController.createCustomer);
router.get("/mine/customers", isAuthProtected, customerController.getMyCustomers);

router.get("/:id", isAuthProtected, customerController.getOneCustomerById);
router.patch("/:id", isAuthProtected, customerController.updateCustomerById);
router.delete("/:id", isAuthProtected, customerController.deleteCustomerById);


router.delete("/delete-many", isAuthProtected, customerController.deleteManyCustomers);

//////////////////////////////////////////////
//// EXPORT ROUTER ////
//////////////////////////////////////////////
module.exports = router;