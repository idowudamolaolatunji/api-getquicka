const Category = require('../models/categoryModel');
const Store = require('../models/storeModel');
const refactory = require('../controllers/handleRefactory');
const { asyncWrapper } = require('../utils/handlers');


//////////////////////////////////////////////
//// STORE CATEGORY LOGIC  ////
//////////////////////////////////////////////
exports.createStoreCategory = refactory.createOne(Category, 'category');
exports.uploadCategoryImage = refactory.uploadOneImage(Category, 'category')

exports.getStoreCategories = refactory.getAll(Category, 'categories');
exports.updateCategory = refactory.updateOne(Category, 'category');
exports.deleteCategory = refactory.deleteOne(Category, 'category');


//////////////////////////////////////////////
//// STORE LOGIC  ////
//////////////////////////////////////////////

exports.createStore = asyncWrapper(async function(req, res) {
    
})

exports.uploadLogoImage = refactory.uploadOneImage(Store, 'logo')
exports.uploadBannerImage = refactory.uploadOneImage(Store, 'banner')


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