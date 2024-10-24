const mongoose = require('mongoose');
const slugify = require('slugify');
const { nanoid } = require("nanoid");

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
    images: [String],
    shortDescription: String,
    description: String,
    productId: String,
    slug: String,
    price: {
        type: Number,
        required: true,
    },
    itemCost: {
        type: Number,
        default: null
    },
    discount: {
        type: Number,
        default: null
    },
    discountType: {
        type: String,
        enum: ["no-discount", "fixed-price", "percentage"],
        default: "no-discount",
    },
    productCollection: [String],
    variations: [{
        size: String,
        color: String,
        quantity: Number,
    }],
    stockAmount: {
        type: Number,
        default: null
    },
    isSoldOut: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft",
    },
    trackInventory: Boolean,
    isVisible: Boolean,
    isPhysical: Boolean,

}, {
    timestamps: true,
});


//////////////////////////////////////////////
//// SCHEMA MIDDLEWARES ////
//////////////////////////////////////////////

productSchema.pre('save', function(next) {
    if(this.isNew) {
        this.productId = nanoid(10)
    }
    next();
});

productSchema.pre('save', function(next) {
    if(this.isNew || this.isModified("name")) {
        const slug = slugify(this.name, { replacement: "-", lower: true });
        this.slug = slug;
    }

    next()
});


//////////////////////////////////////////////
//// MODEL AND COLLECTION ////
//////////////////////////////////////////////
const Product = mongoose.model('Product', productSchema);
module.exports = Product;