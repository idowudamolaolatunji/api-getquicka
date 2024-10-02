const otpEmail = require('../emails/templates/otpEmail');
const welcomeEmail = require('../emails/templates/welcomeEmail');
const Store = require('../models/storeModel');
const User = require('../models/userModel');
const { asyncWrapper } = require('../utils/handlers');
const { generateOtp, signToken } = require('../utils/helpers');
const sendEmail = require('../utils/sendEmail');


exports.signupUser = asyncWrapper(async function(req, res) {
    const { firstname, lastname, email, password, passwordConfirm, countryCode, phoneNumber, phone, dialCode, country } = req.body;

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
        countryCode, phoneNumber,
        phone, dialCode, country
    });

    await Store.create({
        owner: newUser._id,
        contact: {
            countryCode,
            dialCode,
            phoneNumber,
            phone,
            email,
        },
        location: { country }
    })

    // SEND BACK A RESPONSE 
    res.status(201).json({
        status: 'success',
        message: 'Account created successfully!',
        data: { user: { name: newUser.firstname, email: newUser.email } }
    });

    // SEND OTP EMAIL
    await sendEmail({
        email: newUser.email,
        subject: 'Quicka OTP Verification Code',
        message: emailOtpMessage
    })
});



// ONBOARDING STORE AFTER USER SIGNUP AND OTP VERIFICATION
exports.onBoardStoreAfterSignup = asyncWrapper(async function(req, res) {
    const { owner } = req.params;
    
    const user = await User.findById(owner);
    if(!user) return res.json({ message: 'User doesn\'t exist!'});
    if(!user.isOtpVerified) return res.json({ message: 'User not verified!' });
    if(!user.isActive) return res.json({ message: 'User account inactive' });
    if(user.isStoreSetup) return res.json({ message: "Go and set up store from dashboard on a different route"});


    const store = await Store.findOne({ owner });
    if(!store) return res.json({ message: "No store by this user id" });

    await Store.findByIdAndUpdate(store._id, req.body, {
        runValidators: true,
        new: true,
    });
    
    const token = signToken(user._id);
    user.isStoreSetup = true;
    await user.save({ validateModifiedOnly: true });

    res.status(200).json({
        status: 'success',
        message: 'Completed!',
        data: { user, store },
        token
    });
});


exports.loginUser = asyncWrapper(async function (req, res) {
    const { email, password } = req.body;

    // FIND THE USER AND DO SOME CHECKINGS 
    const user = await User.findOne({ email }).select('+password');
    if(!user) return res.json({ message: 'Account does not exist!' });
    if(!user.isActive) return res.json({ message: 'Account is inactive or disabled! Contact Support Team.' });

    if (!user.isOtpVerified) {
        // GENERATE OTP AND EMAIL MESSAGE
        const otp = generateOtp();
        const emailOtpMessage = otpEmail(otp);
        
        // SEND OTP EMAIL
        await sendEmail({
            email: user.email,
            subject: 'Quicka OTP Verification Code',
            message: emailOtpMessage
        })
        
        return res.json({
            data: {
                user: { name: user.firstname, email: user.email },
            },
            message: 'Account not verified. An email has been sent!'
        })
    }
        
    // COMPARE THE USER PASSWORD AND CHECK IF THE EAMIL IS CORRECT
    const comparedPassword = await user.comparePassword(password, user.password)
    if(!user.email || !comparedPassword) return res.json({ message: 'Email or password incorrect!'});

    // SIGNING ACCESS TOKEN
    const token = signToken(user._id);

    // GET THE USER'S STORE
    const store = await Store.findOne({ owner: user._id });
    if(!store) {
        user.isActive = false;
        await user.save({ validateModifiedOnly: true });
        return res.json({ message: `This is not possible that you don't have a store at this point 🤣🤣. Just note that this account would be deactivated in 0.5 seconds! \n And If you don't know what went wrong, Contact us at support@getquicka.com` });
    }

    // SEND BACK RESPONSE 
    res.status(200).json({
        status: 'success',
        message: 'Login successful!',
        data: { user, store },
        token
    });
});


exports.verifyOtp = asyncWrapper(async function(req, res) {
    const { email, otp } = req.body;

    // FIND USER AND DO SOME CHECKINGS 
    const user = await User.findOne({ email }).select('+otpCode');
    if(!user) return res.json({ message: 'No user with this email' });

    const { isOTPExpired } = user?.isOTPExpired();
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
    if(!user) return res.json({ message: 'No user with this email' });

    // DO SOME OTP CHECKINGS..
    const { isOTPExpired, remainingSec } = user?.isOTPExpired();
    if(user.isOtpVerified) return res.json({ message: 'Account alreadty verified!' });
    if(!isOTPExpired) return res.json({
        message: `OTP not yet expired, Remains ${remainingSec}+ seconds..`
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
        data: {user: { name: user.fullname, email: user.email }}
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