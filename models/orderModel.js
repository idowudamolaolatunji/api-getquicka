const mongoose = require('mongoose');

//////////////////////////////////////////////
//// SCHEMA CONFIGURATION  ////
//////////////////////////////////////////////
const orderSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    },
    title: {
        type: String,
        required: true
    },
    channel: {
        type: String,
        required: true
    },
    description: String,
    paymentType: {
        type: String,
        enum: ["paid", "partially", "unpaid"],
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["cash", "bank-transfer", "pos"],
        required: true
    },
    deliveryStatus: {
        type: String,
        emum: ["in-transit", "pending", "delivered"],
        default: "pending"
    },

}, {
    timeStamps: true
});


//////////////////////////////////////////////
//// SCHEMA MIDDLEWARES ////
//////////////////////////////////////////////

orderSchema.pre(/^find/, function (next) {
	this.populate({
		path: "product",
		select: "_id name productId images price discountType stockAmount",
	});

	this.populate({
		path: "customer",
		select: "_id firstname lastname contact shippingAddress createdAt",
	});

	next();
});


//////////////////////////////////////////////
//// MODEL AND COLLECTION ////
//////////////////////////////////////////////
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;