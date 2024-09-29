const mongoose = require('mongoose');
const slugify = require('slugify');


//////////////////////////////////////////////
//// SCHEMA CONFIGURATION  ////
//////////////////////////////////////////////
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: String,
    slug: String,
}, {
    timestamps: true,
}, {
    suppressReservedKeysWarning: true
});


//////////////////////////////////////////////
//// SCHEMA MIDDLEWARES ////
//////////////////////////////////////////////
CategorySchema.pre('save', function(next) {
    if(this.isModified('name') || this.isNew) {
        this.slug = slugify(this.name, { lower: true, replacement: '-' });
    }

    next();
});

//////////////////////////////////////////////
//// MODEL AND COLLECTION ////
//////////////////////////////////////////////
const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;