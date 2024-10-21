const mongoose = require('mongoose');

//////////////////////////////////////////////
//// SCHEMA CONFIGURATION  ////
//////////////////////////////////////////////
const customerSchema = new mongoose.Schema({
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    contact: {
        countryCode: String,
        dialCode: String,
        phoneNumber: String,
        phone: String,
        email: String,
    },
    shippingAddress: {
        address: String,
        country: String,
        state: String,
        city: String,
        zipCode: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});



//////////////////////////////////////////////
//// MODEL AND COLLECTION ////
//////////////////////////////////////////////
const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;