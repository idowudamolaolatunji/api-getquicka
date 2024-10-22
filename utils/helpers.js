const moment = require("moment");
const jwt = require("jsonwebtoken");

const verifyPayment = require("./verifyPayment");

// VERIFICATION RESPONSE
exports.getResponsedata = async function(reference, charges) {
    const paymentVerification = await verifyPayment(reference);
    const response = paymentVerification.data.data;
    
    const amount = (Number(response.amount) / 100) - charges;
    const status = paymentVerification.status;
    const paidAt = response.paidAt;
    return { amount, status, paidAt };
}

// FORMAT NUMBER
exports.formatNumber = function(amount) {
	return Number(amount).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// FORMAT DATE
exports.formatDate = function(givenDate) {
	const currentDate = moment().startOf("day");
	const inputDate = moment(givenDate);

	const diffInSeconds = moment().diff(inputDate, "seconds");
	if (diffInSeconds === 0) {
		return "Just now";
	}
	if (diffInSeconds < 60) {
		return `${diffInSeconds} seconds ago`;
	}

	const diffInMins = moment().diff(inputDate, "minutes");
	if (diffInMins < 60) {
		return `${diffInMins} minute ago`;
	}
	if (inputDate.isSame(currentDate, "day")) {
		return `Today, ${inputDate.format("h:mm A")}`;
	} else if (inputDate.isSame(currentDate.clone().subtract(1, "day"), "day")) {
		return `Yesterday, ${inputDate.format("h:mm A")}`;
	} else if (inputDate.isSame(currentDate.clone().subtract(2, "day"), "day")) {
		return `Two days ago, ${inputDate.format("h:mm A")}`;
	} else {
		return inputDate.format("MMM Do YYYY");
	}
}

// FORMAT DATE, BUT FOR LATER FORMAT
exports.formatDateLater = function(givenDate) {
    const date = moment(givenDate);
    return date.format('MMMM D, YYYY');
}

// GENERATE 4-DIGIT RANDOM OTP CODE
exports.generateOtp = function() {
	const otp = Math.floor(1000 + Math.random() * 9000);
	return otp
};

// SIGN JWT ACCESS TOKEN
exports.signToken = function(id) {
	const token = jwt.sign({ id }, process.env.JWT_SECRET_TOKEN, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
	return token
}

// CAPITALIZE FIRST LETTER
exports.capitalizeFirstLetter = function(string) {
    return string.slice(0, 1).toUpperCase() + string.slice(1);
}

// FILTER ACCEPTABLE OBJECT
exports.filterObj = function(obj, ...allowedFields) {
	const newObj = {};
	Object.keys(obj).forEach(el => {
	  if (allowedFields.includes(el)) newObj[el] = obj[el];
	});
	return newObj;
};
