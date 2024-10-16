const mongoose = require('mongoose');


//////////////////////////////////////////////
//// SCHEMA CONFIGURATION  ////
//////////////////////////////////////////////
const bankDetailSchema = new mongoose.Schema({
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    },
    bankname: String,
    slug: String,
    code: String,
    accountName: String,
    accountNumber: String,
}, {
    timestamps: true,
});




//////////////////////////////////////////////
//// MODEL AND COLLECTION ////
//////////////////////////////////////////////
const BankDetail = mongoose.model('BankDetail', bankDetailSchema);
module.exports = BankDetail;