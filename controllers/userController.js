const User = require("../models/userModel");
const Store = require('../models/storeModel');
const refactory = require('../controllers/handleRefactory');
const { asyncWrapper } = require('../utils/handlers');
const { filterObj } = require("../utils/helpers");


exports.getEveryUsers = refactory.getAll(User, 'users', { limitTO: 100 });
exports.getUserById = refactory.getOne(User, 'user');


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

exports.updateUser = refactory.updateOne(User, 'user');
exports.deleteUser = refactory.deleteOne(User, 'user');


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
  

exports.updateMe = asyncWrapper(async function (req, res) {
    const { password, passwordConfirm} = req.body;

    // CHECK IF USER ISN'T TRYINGG TO UPDATE PASSWORD ON THIS ROUTE
    if(password || passwordConfirm) {
        return res.json({ 
            message: 'This route is not for password updates. Please use /update-Password.'
        });
    }
    
    // FILTER WHAT CAN BE EDITED
    const filteredBody = filterObj(req.body, "email", "firstname", "lastname", "country", "phoneNumber", "state");
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