

const Order = require("../models/orderModel");
const Store = require("../models/storeModel");
const Transaction = require("../models/transactionModel");
const refactory = require('../controllers/handleRefactory');
const { asyncWrapper } = require("../utils/handlers");

//////////////////////////////////////////////
//// ORDER LOGIC  ////
//////////////////////////////////////////////


// RECORD ORDER AND TRANSACTION FOR STORE BY STORE OWNER (PROTECTED)
exports.recordOrder = asyncWrapper(async function(req, res) {
    const storeOwnerId = req.user._id;

    const store = await Store.findOne({ owner: storeOwnerId });
    if(!store) return res.json({ message: 'You don\'t have a store yet!' });

    const order = await Order.create({ ...req.body, store: store._id });
    const transaction = await Transaction.create({ 
        ...req.body, store: store._id, order: order._id,
        status: order.paymentStatus != "unpaid" ? "pending" : "success",
    });

    res.status(201).json({
        status: "success",
        message: "Order created successfully!",
        data: { order, transaction }
    });
});



// GET ALL ORDER FOR STORE BY STORE OWNER (PROTECTED)
exports.getMyOrders = refactory.getItemsByStoreOwner(Order, "orders");

// GET ONE ORDER
exports.getOneOrderById = refactory.getOne(Order, "order");

// UPDATE ORDER INFO BY STORE OWNER (PROTECTED)
exports.updateOrderById = refactory.updateOne(Order, "order");

// DELETE ORDER BY STORE OWNER (PROTECTED)
exports.deleteOrderById = refactory.deleteOne(Order, "order")

// DELETE MANY ORDER BY STORE OWNER (PROTECTED)
exports.deleteManyOrders = refactory.deleteManyForStore(Order, "orders")