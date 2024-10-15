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
    deliveryType: {
        type: String,
        enum: ['free', 'paid'],
        default: 'paid',
    },
    fee: Number,
    description: String,
    visible: {
        type: Boolean,
        default: true
    }
}, {
    timeStamps: true,
});



//////////////////////////////////////////////
//// MODEL AND COLLECTION ////
//////////////////////////////////////////////
const DeliveryRate = mongoose.model('DeliveryRate', deliveryRatesSchema);
module.exports = DeliveryRate;