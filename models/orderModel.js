const mongoose = require('mongoose');
const { customAlphabet } = require('nanoid');
// const nanoid = customAlphabet('1234567890abcdef', 10)
const nanoid = customAlphabet('1234567890', 10)


//////////////////////////////////////////////
//// SCHEMA CONFIGURATION  ////
//////////////////////////////////////////////
const orderSchema = new mongoose.Schema({
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }],
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    },
    delivery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryRate',
    },
    orderId: String,
    orderDate: {
        type: Date,
        required: true,
    },
    channel: {
        type: String,
        default: "online store"
    },
    description: String,
    paymentStatus: {
        type: String,
        enum: ["paid", "partially", "unpaid"],
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["cash", "bank-transfer", "pos", "web"],
        required: true
    },
    deliveryStatus: {
        type: String,
        emum: ["in-transit", "pending", "delivered"],
        default: "pending"
    },
    orderStatus: {
        type: String,
        emum: ["completed", "pending"],
        default: "pending"
    }

}, {
    timeStamps: true
});


//////////////////////////////////////////////
//// SCHEMA MIDDLEWARES ////
//////////////////////////////////////////////

orderSchema.pre(/^find/, function (next) {
	this.populate({
		path: "products",
		select: "_id name images price discountType stockAmount",
	});

	this.populate({
		path: "customer",
		select: "_id firstname lastname contact shippingAddress createdAt",
	});

	next();
});



orderSchema.pre('save', function(next) {
    if(this.isNew) {
        this.orderId = "#" + nanoid(5);
    }
    next();
});


//////////////////////////////////////////////
//// MODEL AND COLLECTION ////
//////////////////////////////////////////////
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;