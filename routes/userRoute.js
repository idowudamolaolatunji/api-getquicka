//////////////////////////////////////////////////
//////////////////////////////////////////////////
const express = require('express');
const authcontroller = require('../controllers/authController');
const userController = require('../controllers/userController');
const { isAuthProtected, isRestricted } = require('../middlewares/protected');
const { uploadSingleImage, resizeSingleUserImage } = require('../middlewares/multer');

//////////////////////////////////////////////////
//////////////////////////////////////////////////

const router = express.Router();

//////////////////////////////////////////////
//// CREATING AND CONFIGURING ROUTES ////
//////////////////////////////////////////////

// AUTH ROUTES
router.post('/signup', authcontroller.signupUser);
router.post('/login', authcontroller.loginUser);
router.get('/logout', authcontroller.logoutUser);

// VERIFICATION ROUTES
router.patch('/verify-otp', authcontroller.verifyOtp);
router.patch('/request-otp', authcontroller.requestOtp);

// FORGOT AND RESET ROUTES
router.patch('/forgot-password', authcontroller.forgotPassword);
router.patch('/reset-password', authcontroller.resetPassord);

// ROUTE FOR PROTECTED USER
router.patch('/update-password', isAuthProtected, authcontroller.updatePassword);
router.patch('/update-profile', isAuthProtected, userController.updateMe);
router.patch('/upload-avatar', uploadSingleImage, resizeSingleUserImage, isAuthProtected, userController.uploadProfileAvatar);
router.patch('/delete-account', isAuthProtected, userController.deleteAccount);

// ROUTES RESTRICTED TO JUST ADMINS
router.get('/', isAuthProtected, isRestricted, userController.getEveryUsers);
router.get('/:id', isAuthProtected, isRestricted, userController.getUserById);
router.patch('/:id', isAuthProtected, isRestricted, userController.updateUser);
router.delete('/:id', isAuthProtected, isRestricted, userController.deleteUser);

//////////////////////////////////////////////
//// EXPORT ROUTER ////
//////////////////////////////////////////////
module.exports = router;