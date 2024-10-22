//////////////////////////////////////////////////
//////////////////////////////////////////////////
const express = require('express');
const transactionController = require('../controllers/transactionController');
const { isAuthProtected, isRestricted } = require('../middlewares/protected');

//////////////////////////////////////////////////
//////////////////////////////////////////////////
const router = express.Router();

//////////////////////////////////////////////
//// CREATING AND CONFIGURING ROUTES ////
//////////////////////////////////////////////


router.get("/mine/transactions", isAuthProtected, transactionController.getMyTransactions);
router.get("/:id", isAuthProtected, transactionController.getOneTransactionById);
router.patch("/:id", isAuthProtected, transactionController.updateTransactionById);
router.delete("/:id", isAuthProtected, transactionController.deleteTransactionById);

router.delete("/delete-many", isAuthProtected, transactionController.deleteManyTransactions);



//////////////////////////////////////////////
//// EXPORT ROUTER ////
//////////////////////////////////////////////
module.exports = router;