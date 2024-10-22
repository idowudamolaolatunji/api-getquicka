const Customer = require('../models/customerModel');
const refactory = require('../controllers/handleRefactory');


//////////////////////////////////////////////
//// CUSTOMER LOGIC  ////
//////////////////////////////////////////////

// CREATE CUSTOMER FOR STORE BY STORE OWNER (PROTECTED)
exports.createCustomer = refactory.createOneForStore(Customer, "customer");

// GET ALL CUSTOMER FOR STORE BY STORE OWNER (PROTECTED)
exports.getMyCustomers = refactory.getItemsByStoreOwner(Customer, "customers");

// GET ONE CUSTOMER
exports.getOneCustomerById = refactory.getOne(Customer, "customer");

// UPDATE CUSTOMER INFO BY STORE OWNER (PROTECTED)
exports.updateCustomerById = refactory.updateOne(Customer, "customer");

// DELETE CUSTOMER BY STORE OWNER (PROTECTED)
exports.deleteCustomerById = refactory.deleteOne(Customer, "customer")

// DELETE MANY CUSTOMER BY STORE OWNER (PROTECTED)
exports.deleteManyCustomers = refactory.deleteManyForStore(Customer, "customers")