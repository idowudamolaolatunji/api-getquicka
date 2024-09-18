const mongoose = require('mongoose');

//////////////////////////////////////////////
//// SCHEMA CONFIGURATION  ////
//////////////////////////////////////////////
const templateSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    colors: [String],
    themeImages: [String],
    themeType: {
        type: String,
        enum: ['free', 'premium'],
    },
}, {
    timestamps: true,
});

//////////////////////////////////////////////
//// MODEL AND COLLECTION ////
//////////////////////////////////////////////
const Template = mongoose.model('Template', templateSchema);
module.exports = Template;