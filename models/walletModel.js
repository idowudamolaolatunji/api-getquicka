const mongoose = require('mongoose');

//////////////////////////////////////////////
//// SCHEMA CONFIGURATION  ////
//////////////////////////////////////////////
const walletSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    Pendingbalance: {
        type: Number,
        default: 0
    }
});


//////////////////////////////////////////////
//// SCHEMA MIDDLEWARES ////
//////////////////////////////////////////////
walletSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'user',
        select: '_id firstname email',
    })
    next();
});


//////////////////////////////////////////////
//// MODEL AND COLLECTION ////
//////////////////////////////////////////////
const Wallet = mongoose.model('Wallet', walletSchema);
module.exports = Wallet;