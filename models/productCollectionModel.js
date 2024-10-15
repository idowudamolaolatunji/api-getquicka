const mongoose = require('mongoose');
const slugify = require('slugify');

//////////////////////////////////////////////
//// SCHEMA CONFIGURATION  ////
//////////////////////////////////////////////
const productCollectionSchema = new mongoose.Schema({
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    slug: String,
    image: String,
}, {
    timestamps: true,
});


//////////////////////////////////////////////
//// SCHEMA MIDDLEWARES ////
//////////////////////////////////////////////
productCollectionSchema.pre('save', function(next) {
    if(this.isModified('name') || this.isNew) {
        this.slug = slugify(this.name, { lower: true, replacement: '-' });
    }

    next();
});

productCollectionSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'store',
        select: '_id'
    });

    next();
});

//////////////////////////////////////////////
//// MODEL AND COLLECTION ////
//////////////////////////////////////////////
const ProductCollection = mongoose.model('ProductCollection', productCollectionSchema);
module.exports = ProductCollection;