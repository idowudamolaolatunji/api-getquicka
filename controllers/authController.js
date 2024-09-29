const otpEmail = require('../emails/templates/otpEmail');
const welcomeEmail = require('../emails/templates/welcomeEmail');
const User = require('../models/userModel');
const Wallet = require('../models/walletModel');
const { asyncWrapper } = require('../utils/handlers');
const { generateOtp, signToken } = require('../utils/helpers');
const sendEmail = require('../utils/sendEmail');


exports.signupUser = asyncWrapper(async function(req, res) {
    const { firstname, lastname, email, password, passwordConfirm, countryCode, phoneNumber } = req.body;

    // CHECK IF THE EMAIL ALREADY EXISTS
    const emailExist = await User.findOne({ email });
    if(emailExist) return res.json({ message: 'Email already exist!!' });

    // GENERATE OTP AND EMAIL MESSAGE
    const otp = generateOtp();
    const emailOtpMessage = otpEmail(otp);

    // CREATE USER
    const newUser = await User.create({
        firstname,
        lastname, 
        email, 
        password, 
        passwordConfirm,
        otpCode: otp,
        info: { countryCode, phoneNumber }
    });

    // CREATE A USER WALLET
    await Wallet.create({
        user: newUser._id,
    });

    // SEND BACK A RESPONSE 
    res.status(201).json({
        status: 'success',
        message: 'Account created successfully!',
        data: { user: newUser }
    });

    // SEND OTP EMAIL
    await sendEmail({
        email: newUser.email,
        subject: 'Quicka OTP Verification Code',
        message: emailOtpMessage
    })
});


exports.loginUser = asyncWrapper(async function (req, res) {
    const { email, password } = req.body;

    // FIND THE USER AND DO SOME CHECKINGS 
    const user = await User.findOne({ email }).select('+password');
    if(!user || !user.isActive) return res.json({ message: 'Account does not exist or is inactive!' });
    if (!user.isOtpVerified) return res.json({ message: 'Account not verified!' })
        
    // COMPARE THE USER PASSWORD AND CHECK IF THE EAMIL IS CORRECT
    const comparedPassword = await user.comparePassword(password, user.password)
    if(!user.email || !comparedPassword) return res.json({ message: 'Email or password incorrect!'});

    // SIGNING ACCESS TOKEN
    const token = signToken(user._id);

    // SEND BACK RESPONSE 
    res.status(200).json({
        status: 'success',
        message: 'Login successful!',
        data: { user },
        token
    });
});


exports.verifyOtp = asyncWrapper(async function(req, res) {
    const { email, otp } = req.body;

    // FIND USER AND DO SOME CHECKINGS 
    const user = await User.findOne({ email }).select('+otpCode');
    const { isOTPExpired } = user.isOTPExpired();
    if(user.isOtpVerified) return res.json({ message: 'Account alreadty verified!' });
    if(isOTPExpired) return res.json({ message: 'OTP Expired, Request new OTP!'});
    if(+otp !== user.otpCode) return res.json({ message: 'Invalid OTP code!' });

    // UPDATE USER OTP
    user.isOtpVerified = true;
    user.otpCode = undefined;
    await user.save({ validateBeforeSave: false });

    // CREATE EMAIL MESSAGE
    const emailOtpVerifiedMessage = welcomeEmail(user);

    // SEND BACK RESPONSE
    res.status(200).json({
        status: 'success',
        message: 'OTP verified!',
        data: { user }
    });

    // SEND WELCOME MESSAGE
    await sendEmail({
        email, subject: 'Welcome to quicka',
        message: emailOtpVerifiedMessage,
    });
});


exports.requestOtp = asyncWrapper(async function(req, res) {
    const { email } = req.body;

    // FIND USER AND DO SOME CHECKINGS
    const user = await User.findOne({ email });
    const { isOTPExpired, remainingSec } = user.isOTPExpired();
    if(user.isOtpVerified) return res.json({ message: 'Account alreadty verified!' });
    if(!isOTPExpired) return res.json({
        message: `OTP not yet expired, Remains ${remainingSec} seconds..`
    });

    // GENERATE NEW OTP CODE
    const otp = generateOtp();
    const emailOtpResendMessage = otpEmail(otp);
    user.otpIssuedAt = Date.now();
    user.otpCode = otp;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        status: 'success',
        message: 'OTP verification code resent!',
        data: { user }
    });

    await sendEmail({
        email, subject: 'Quicka OTP Verification Code Resent!',
        message: emailOtpResendMessage,
    });

});


exports.updatePassword = asyncWrapper(async function (req, res) {

    const { password, newPassword, newPasswordConfirm } = req.body;
    const user = await User.findById(req.user._id).select("+password");

    // CHECL IF PASSWORD IS CORRECT
    const comparedPassword = await user.comparePassword(password, user.password)
    if (!comparedPassword) {
        return res.json({ message: "Your current password is wrong." });
    }
    
    // CHECK IF PASSWORD IS NOT THE SAME AS NEW PASSWORD
    const comparedPasswordWithCurrent = await user.comparePassword(newPassword, user.password)
    if (comparedPasswordWithCurrent) {
        return res.json({ message: "Previous password and new password cannot be the same." });
    }

    // UPDATE PASSWORD AND PASSWORD CONFIRM 
    // User.findByIdAndUpdate, will not work here...
    user.password = newPassword;
    user.passwordConfirm = newPasswordConfirm;
    await user.save({ validateModifiedOnly: true });
    

    // RESIGN ACCESS TOKEN
    const token = signToken(user._id)

    // SEND BACK RESPONSE
    return res.status(201).json({
        status: "success",
        message: 'Password changed successfully!',
        data: { user },
        token,
    });

})


exports.logoutUser = function(req, res) {
    res.clearCookie('jwt')
    res.status(200).json({ status: 'success' });
};


exports.forgotPassword = asyncWrapper(async function (req, res) {
    const { email } = req.body;

    // GET USER BY EMAIL SENT
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "There is no user with email address" });
    }

    // GENERATE RANDOM TOKEN
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false }); // NOT SURE IF THIS IS NECESSARY


    // SEND EMAIL TO USER
    // const resetURL = `https://www.passpro.com/reset-password/${resetToken}`;
    const resetEmail = passwordResetEmail(resetToken);

    await sendEmail({
        email: user.email,
        subject: 'Quicka Password Reset Token (valid for 10 min)',
        message: resetEmail
    });

    res.status(200).json({
        status: "success",
        message: "Reset password request sent!",
        data: { user }
        });
})


exports.resetPassord = asyncWrapper(async function (req, res) {

    const { password, passwordConfirm } = req.body;

    // GET THE USER BASED ON THE TOKEN
    const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    }).select('password passwordResetToken passwordResetExpires');

    // IF TOKEN HAS NOT EXPIRED, THERE IS A USER
    if (!user) return res.status(404).json({ message: "Token is invalid or has expired" });

    // COMPARE PASSWORD
    const comparedPassword = await user.comparePassword(password, user.password);
    if(comparedPassword) return res.json({
        message: 'Previous password and new password cannot be the same',
    });
    
    // SET NEW PASSWORDS
    user.password = password;
    user.passwordConfirm = passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: true });

    // update changedPasswordAt for the user
    // done in userModel on the user schema

    res.status(200).json({
        status: "success",
        message: "Password reset successful",
        data: { user }
    });
});