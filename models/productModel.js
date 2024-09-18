const mongoose = require('mongoose');
const slugify = require('slugify');
const { nanoid } = require('nanoid');

//////////////////////////////////////////////
//// SCHEMA CONFIGURATION  ////
//////////////////////////////////////////////

const productSchema = new mongoose.Schema({
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    productId: String,
    images: [String],
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    slashPrice: Number,
    collection: String,
    details: [{
        size: String,
        color: String,
        quantity: Number,
    }],
    stockAmount: {
        type: Number,
        default: 1
    },
}, {
    timestamps: true,
});


//////////////////////////////////////////////
//// SCHEMA MIDDLEWARES ////
//////////////////////////////////////////////
productSchema.pre('save', function(next) {
    if(this.isNew) {
        this.productId = nanoid();
    }
    next();
});


productSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'store',
        select: '_id'
    });

    next();
})


//////////////////////////////////////////////
//// MODEL AND COLLECTION ////
//////////////////////////////////////////////
const Product = mongoose.model('Product', productSchema);
module.exports = Product;