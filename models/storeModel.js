const mongoose = require('mongoose');
const { default: slugify } = require('slugify');

//////////////////////////////////////////////
//// SCHEMA CONFIGURATION  ////
//////////////////////////////////////////////
const storeSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    template: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Template',
    },
    customDesign: {
        logo: String,
        spinner: String,
        introBanner: String,
        primaryColor: String,
        secondaryColor: String,
        greyColor: String,
    },
    name: {
        type: String,
        lowercase: true,
    },
    title: String,
    subTitle: String,
    description: String,
    slug: String,
    storeUrl: { type: String, unique: true },
    subdomain: { type: String, unique: true },
    isCoperated: String,
    type: String,
    domain: {
        type: String,
        default: null
    },
    previousUrl: {
        type: String,
        default: null
    },
    currency: {
        type: [String],
    },
    contact: {
        countryCode: String,
        dialCode: String,
        phoneNumber: String,
        phone: String,
        email: String,
    },
    location: {
        city: String,
        country: String,
        state: String,
        address: {
            type: String,
            default: null,
        },
        zip: {
            type: String,
            default: null
        },
    },
    category: String,
    isPremium: {
        type: Boolean,
        default: false
    },
    storeCredits: {
        type: Number,
        default: 50
    },
    maintenanceMode: {
        type: Boolean,
        default: true
    },
    maintenanceMessage: { type: String, default: 'We are not available right now' },
    settings: {  },
    // MORE TO COME...
}, {
    timeStamps: true,
});


//////////////////////////////////////////////
//// SCHEMA MIDDLEWARES ////
//////////////////////////////////////////////
storeSchema.pre('save', function(next) {
    if(this.isModified('name')) {
        const storeName = this.name;
        this.title = storeName;
        const slug = slugify(storeName, { lower: true, replacement: "-"} )
        this.slug = `${slug}-${this._id.toString().slice(0, 4)}`
    }

    next();
});

storeSchema.pre('save', function(next) {
    if(this.isModified('domain')) {
        this.previousUrl = this.storeUrl;
        this.storeUrl = this.domain;
    }

    next();
})


storeSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'owner',
        select: '_id firstname email image'
    });

    this.populate({
        path: 'template',
        select: '_id name'
    });

    next();
})

//////////////////////////////////////////////
//// MODEL AND COLLECTION ////
//////////////////////////////////////////////
const Store = mongoose.model('Store', storeSchema);
module.exports = Store;