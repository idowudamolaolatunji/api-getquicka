const Category = require('../models/categoryModel');
const Store = require('../models/storeModel');
const User = require('../models/userModel');
const refactory = require('../controllers/handleRefactory');
const { asyncWrapper } = require('../utils/handlers');
const { signToken } = require('../utils/helpers');


//////////////////////////////////////////////
//// STORE CATEGORY LOGIC  ////
//////////////////////////////////////////////
exports.createStoreCategory = refactory.createOne(Category, 'category');
exports.uploadCategoryImage = refactory.uploadOneImage(Category, 'category')

exports.getStoreCategories = refactory.getAll(Category, 'categories', {});
exports.updateCategory = refactory.updateOne(Category, 'category');
exports.deleteCategory = refactory.deleteOne(Category, 'category');


//////////////////////////////////////////////
//// STORE LOGIC  ////
//////////////////////////////////////////////


// onboarding store on signup, come back to modify
exports.onBoardStore = asyncWrapper(async function(req, res) {
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

    res.status(200).json({
        status: 'success',
        message: 'Completed!',
        data: { user },
        token
    });
});


exports.uploadLogoImage = refactory.uploadOneImage(Store, 'logo')
exports.uploadBannerImage = refactory.uploadOneImage(Store, 'banner')


exports.getStores = refactory.getAll(Store, 'stores', {});
exports.getStore = refactory.getOne(Store, 'store');


exports.loadStoreByUrl = asyncWrapper(async function(req, res) {
    const url = req.params;

    const store = await Store.findOne({ $or: [{ subdomain: url }, { domain: url }] });
    if(!store) return res.status(404).json({ message: 'Store not found' });
    if(store.maintenanceMode) return res.json({ message: store.maintenanceMessage });

    res.status(200).json({
        status: 'success',
        data: { store }
    });
});


exports.getStoresInCategory = asyncWrapper(async function(req, res) {
    const { slug } = req.params;
    
    const category = await Category.findOne({ slug });
    if(!category) return res.json({ message: 'No category found' });

    const stores = await Store.find({ category: category.name }).limit(100).sort({ createdAt: -1 });
    if(!stores || stores.length < 1) return res.json({ message: `No store in "${category.name}" category`});

    res.status(200).json({
        status: 'success',
        data: { stores }
    });
});