//////////////////////////////////////////////////
//////////////////////////////////////////////////
const express = require('express');
const orderController = require('../controllers/orderController');
const { isAuthProtected, isRestricted } = require('../middlewares/protected');

//////////////////////////////////////////////////
//////////////////////////////////////////////////
const router = express.Router();

//////////////////////////////////////////////
//// CREATING AND CONFIGURING ROUTES ////
//////////////////////////////////////////////


router.post("/record", isAuthProtected, orderController.recordOrder);
router.get("/mine/orders", isAuthProtected, orderController.getMyOrders);
router.get("/:id", isAuthProtected, orderController.getOneOrderById);
router.patch("/:id", isAuthProtected, orderController.updateOrderById);
router.delete("/:id", isAuthProtected, orderController.deleteOrderById);

router.delete("/delete-many", isAuthProtected, orderController.deleteManyOrders);




//////////////////////////////////////////////
//// EXPORT ROUTER ////
//////////////////////////////////////////////
module.exports = router;