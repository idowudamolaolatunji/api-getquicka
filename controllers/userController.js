const User = require("../models/userModel");
const refactory = require('../controllers/handleRefactory');
const { asyncWrapper } = require('../utils/handlers');
const { filterObj } = require("../utils/helpers");


// ADMIN GET ALL USERS
exports.getEveryUsers = refactory.getAll(User, 'users');

// ADMIN GET USER BY ID
exports.getUserById = refactory.getOne(User, 'user');

// ADMIN UPDATE USER BY ID
exports.updateUser = refactory.updateOne(User, 'user');

// ADMIN DELETE USER BY ID
exports.deleteUser = refactory.deleteOne(User, 'user');


// USER UPDATE AVATAR / PROFILE IMAGE (AUTHORISED)
exports.uploadProfileAvatar = asyncWrapper(async function (req, res) {
    const id = req.user._id;
    let avatar;
    if(req.file) avatar = req.file.filename;

    await User.findByIdAndUpdate(id, { avatar }, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: 'success',
        message: 'Profile avatar uploaded'
    });
});

// USER DELETE USER ACCOUNT (AUTHORISED)
exports.deleteAccount = asyncWrapper(async function(req, res) {
    const { password } = req.body;
    const user = await User.findById(req.user._id).select('+password');
    if(!user || !user.isActive) return res.json({ message: 'User not found or inactive!' });

    // CHECK IF THE PROVIDED PASSWORD IS CORRECT
    const comparedPassword = await user.comparePassword(password, user.password)
    if (!comparedPassword) return res.json({ message: "Incorrect password " });

    await User.findByIdAndUpdate(user._id, { isActive: false });
    req.session.destroy();
    res.clearCookie('jwt');
    res.status(204).json({
        status: "success",
        message: 'Account deleted!',
        data: null
    });
})
  
// USER UPDATES PROFILE (AUTHORISED)
exports.updateMe = asyncWrapper(async function (req, res) {
    const { password, passwordConfirm} = req.body;

    // CHECK IF USER ISN'T TRYINGG TO UPDATE PASSWORD ON THIS ROUTE
    if(password || passwordConfirm) {
        return res.json({ 
            message: 'This route is not for password updates. Please use /update-Password.'
        });
    }
    
    // FILTER WHAT CAN BE EDITED
    const filterArray = ["email", "firstname", "lastname", "country", "phoneNumber", "state"]
    const filteredBody = filterObj(req.body, ...filterArray);
    const user = await User.findByIdAndUpdate(req.user._id, filteredBody, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: "success",
        message: 'Profile Updated!',
        data: { user }
    });
});