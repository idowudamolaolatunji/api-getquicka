const mongoose = require('mongoose');

//////////////////////////////////////////////
//// SCHEMA CONFIGURATION  ////
//////////////////////////////////////////////
const deliveryRatesSchema = new mongoose.Schema({
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    },
    title: {
        type: String,
        unique: true,
        required: true
    },
    shippingType: {
        type: String,
        enum: ['free', 'paid'],
        default: 'paid',
    },
    fee: Number,
    description: String,
    locations: [String],
    visible: {
        type: Boolean,
        default: true
    }
}, {
    timeStamps: true,
});


//////////////////////////////////////////////
//// SCHEMA MIDDLEWARES ////
//////////////////////////////////////////////
deliveryRatesSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'store',
        select: '_id'
    });

    next();
});


//////////////////////////////////////////////
//// MODEL AND COLLECTION ////
//////////////////////////////////////////////
const DeliveryRate = mongoose.model('DeliveryRate', deliveryRatesSchema);
module.exports = DeliveryRate;