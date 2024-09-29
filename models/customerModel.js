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
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {
    suppressReservedKeysWarning: true
});


//////////////////////////////////////////////
//// SCHEMA MIDDLEWARES ////
//////////////////////////////////////////////

customerSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'store',
        select: '_id'
    });

    next();
})

//////////////////////////////////////////////
//// MODEL AND COLLECTION ////
//////////////////////////////////////////////
const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;