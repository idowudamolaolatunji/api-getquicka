

const Order = require("../models/orderModel");
const Store = require("../models/storeModel");
const Transaction = require("../models/transactionModel");
const { asyncWrapper } = require("../utils/handlers");

//////////////////////////////////////////////
//// ORDER LOGIC  ////
//////////////////////////////////////////////



exports.recordOrder = asyncWrapper(async function(req, res) {
    const storeOwnerId = req.user._id;

    const store = await Store.findOne({ owner: storeOwnerId });
    if(!store) return res.json({ message: 'You don\'t have a store yet!' });

    const order = await Order.create({ ...req.body, store: store._id });
    const transaction = await Transaction.create({ 
        ...req.body, store: store._id, order: order._id,
        status: order.paymentStatus != "unpaid" ? "pending" : "success",
    });

});