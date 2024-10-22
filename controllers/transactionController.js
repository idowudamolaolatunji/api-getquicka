
const Transaction = require('../models/transactionModel');
const refactory = require('../controllers/handleRefactory');



//////////////////////////////////////////////
//// TRANSACTION LOGIC  ////
//////////////////////////////////////////////

// GET ALL TRANSACTION FOR STORE BY STORE OWNER (PROTECTED)
exports.getMyTransactions = refactory.getItemsByStoreOwner(Transaction, "transactions");

// GET ONE TRANSACTION
exports.getOneTransactionById = refactory.getOne(Transaction, "transaction");

// UPDATE TRANSACTION INFO BY STORE OWNER (PROTECTED)
exports.updateTransactionById = refactory.updateOne(Transaction, "transaction");

// DELETE TRANSACTION BY STORE OWNER (PROTECTED)
exports.deleteTransactionById = refactory.deleteOne(Transaction, "transaction")

// DELETE MANY TRANSACTION BY STORE OWNER (PROTECTED)
exports.deleteManyTransactions = refactory.deleteManyForStore(Transaction, "transactions")