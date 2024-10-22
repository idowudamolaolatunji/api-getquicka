const mongoose = require("mongoose");
const slugify = require("slugify");

const User = require("./userModel");

//////////////////////////////////////////////
//// SCHEMA CONFIGURATION  ////
//////////////////////////////////////////////
const storeSchema = new mongoose.Schema({
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
		unique: true,
	},
	template: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Template",
	},
	customDesign: {
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
	logo: {
		type: String,
		default: null
	},
	title: String,
	subTitle: String,
	description: String,
	slug: String,
	storeUrl: String,
	isRegistered: String,
	regType: String,
	domain: String,
	previousUrl: String,
	currency: [String],
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
			default: null,
		},
	},
	category: String,
	storeOnboard: {
		hasCustomisedStore: { type: Boolean, default: false },
		hasFirstProduct: { type: Boolean, default: false },
		hasDeliveryRate: { type: Boolean, default: false },
		hasBankDetails: { type: Boolean, default: false },
	},
	reasonAndGoalOptions: [String],
	isPremium: {
		type: Boolean,
		default: false,
	},
	csvConvertions: {
		type: Number,
		default: 3
	},
	storeCredits: {
		type: Number,
		default: 50,
	},
	maintenanceMode: {
		type: Boolean,
		default: true,
	},
	maintenanceMessage: { type: String, default: "We are not available right now" },
	settings: {},
	// MORE TO COME...
},{
	timeStamps: true,
});

//////////////////////////////////////////////
//// SCHEMA MIDDLEWARES ////
//////////////////////////////////////////////
storeSchema.pre("save", function (next) {
	if (this.isModified("name")) {
		const storeName = this.name;
		this.title = storeName;
		this.storeUrl = `https://${this.storeUrl}.quicka.store`;
		const slug = slugify(storeName, { lower: true, replacement: "-" });
		this.slug = `${slug}-${this._id.toString().slice(0, 4)}`;
	}

	next();
});

storeSchema.pre("save", function (next) {
	if (this.isModified("domain")) {
		this.previousUrl = this.storeUrl;
		this.storeUrl = this.domain;
	}

	next();
});

storeSchema.pre("save", async function (next) {
	if (this.isModified("storeOnboard")) {
        // THIS HERE IS ESSENTIALLY TO DYNAMICALLY HELP US MODIFY THE USER storeFinalSetup VALUE ON THE USER DOCUMENT WHEN ALL THE FIELDS IN THIS FIELD IS TRUE, I.E: STORE IS COMPLETELY SETUP.
		const storeIsFullyOnboarded = Object.values(this.storeOnboard).every((value) => value);

		if (storeIsFullyOnboarded) {
			const user = await User.findById(this.userId);
			if (user) {
				user.storeFinalSetup = true;
				await user.save();
			}
		}
	}

	next();
});

storeSchema.pre(/^find/, function (next) {
	this.populate({
		path: "owner",
		select: "_id firstname email image",
	});

	this.populate({
		path: "template",
		select: "_id name",
	});

	next();
});

//////////////////////////////////////////////
//// MODEL AND COLLECTION ////
//////////////////////////////////////////////
const Store = mongoose.model("Store", storeSchema);
module.exports = Store;
