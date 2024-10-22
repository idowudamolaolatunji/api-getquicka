const mongoose = require('mongoose');

//////////////////////////////////////////////
//// SCHEMA CONFIGURATION  ////
//////////////////////////////////////////////
const transactionSchema = new mongoose.Schema({
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    amount: Number,
    transactionId: String,
    transactionType: String,
    status: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending"
    },
}, {
    timeStamps: true,
});


//////////////////////////////////////////////
//// SCHEMA MIDDLEWARES ////
//////////////////////////////////////////////



//////////////////////////////////////////////
//// MODEL AND COLLECTION ////
//////////////////////////////////////////////
const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;