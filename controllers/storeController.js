const Category = require('../models/categoryModel');
const Store = require('../models/storeModel');
const refactory = require('../controllers/handleRefactory');
const { asyncWrapper } = require('../utils/handlers');
// const BankDetail = require('../models/bankDetailModel');


//////////////////////////////////////////////
//// STORE CATEGORY LOGIC  ////
//////////////////////////////////////////////

// ADMIN CREATES STORE CATEGORY (PROTECTED)
exports.createStoreCategory = refactory.createOne(Category, 'category');

// ADMIN UPLOAD STORE CATEGORY IMAGE (PROTECTED)
exports.uploadCategoryImage = refactory.uploadOneImage(Category, 'category')

// GET ALL STORE CATEGORY (UNPORTECTED)
exports.getStoreCategories = refactory.getAll(Category, 'categories', {createdAt: 1});

// ADMIN UPDATES STORE CATEGORY (PROTECTED)
exports.updateCategory = refactory.updateOne(Category, 'category');

// ADMIN DELETES STORE CATEGORY (PROTECTED)
exports.deleteCategory = refactory.deleteOne(Category, 'category');



//////////////////////////////////////////////
//// STORE BANK DETAIL  ////
//////////////////////////////////////////////
// exports.updatePaymentInfo = refactory.updateOne(BankDetail, 'payment info');
// exports.getAllUserPaymentInfo = refactory.getAll(BankDetail, '', {});



//////////////////////////////////////////////
//// STORE LOGIC  ////
//////////////////////////////////////////////

// UPLOAD STORE LOGOG IMAGE BY STORE OWNER (PROTECTED)
exports.uploadLogoImage = refactory.uploadOneImage(Store, 'logo');

// UPLOAD STORE BANNER IMAGE BY STORE OWNER (PROTECTED)
exports.uploadBannerImage = refactory.uploadOneImage(Store, 'banner')

// (COME BACK HERE..)
exports.getStores = refactory.getAll(Store, 'stores');
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