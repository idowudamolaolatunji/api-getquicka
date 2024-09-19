const mongoose = require('mongoose');

//////////////////////////////////////////////
//// SCHEMA CONFIGURATION  ////
//////////////////////////////////////////////
const storeSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    template: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Template',
        required: true,
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
        unique: true,
        lowercase: true,
        required: true
    },
    title: String,
    subTitle: String,
    description: String,
    storeUrl: String,
    subdomain: String,
    slug: String,
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
        required: true
    },
    contact: {
        dialingCode: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        phone: String,
        email: String,
    },
    address: {
        zip: {
            type: String,
            default: null
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        street: {
            type: String,
            default: null,
        },
        country: {
            type: String,
            required: true
        },
    },
    category: {
        type: String,
        required: true
    },
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
    timestamps: true
});


//////////////////////////////////////////////
//// SCHEMA MIDDLEWARES ////
//////////////////////////////////////////////
storeSchema.pre('save', function(next) {
    if(this.isNew) {
        const storeName = this.name.toString().toLowerCase().replace(' ', '');
        this.storeUrl = `${storeName}.quicka.store`;
        this.subdomain = storeName;
        this.title = storeName;
        this.slug = `${storeName}-${this._id.toString().slice(0, 4)}`
    }

    const contact = this.contact;
    contact.phone = `${contact.dialingCode}${contact.phoneNumber}`
    
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