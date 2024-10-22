const Store = require("../models/storeModel");
const User = require("../models/userModel");
const { asyncWrapper } = require("../utils/handlers");
const { capitalizeFirstLetter } = require("../utils/helpers");


// GET ALL, GENERIC | PROTECTED AND UNPROTECTED
exports.getAll = function(Model, title, sortBy={createdAt: -1}) {
    return asyncWrapper(async function(_, res) {
        const documents = await Model.find().sort(sortBy);

        if(!documents || documents?.length < 1) return res.json({ 
            message: `No ${title.toString().slice(0, -1)} found`
        });

        res.status(200).json({
            status: 'success',
            count: documents.length,
            data: { [title]: documents }
        });
    });
}

// GET ONE BY IT'S ID | PROTECTED AND UNPROTECTED
exports.getOne = function(Model, title) {
    return asyncWrapper(async function(req, res) {
        const { id } = req.params;
        const document = await Model.findById(id);
        if(!document) return res.json({ message: `No ${title} found with that Id` });

        res.status(200).json({
            status: 'success',
            data: { [title]: document }
        })
    })
}


// GET ALL ITEMS BY STORE OWNER (PROTECTED)
exports.getItemsByStoreOwner = function(Model, title) {
    return asyncWrapper(async function(req, res) {
        const ownerId = req.user._id;
        const store = await Store.findOne({ owner: ownerId });
        if(!store) return res.json({ message: 'You don\'t have a store yet!' });

        const documents = await Model.find({ store: store._id }).sort({ createdAt: -1 });
        if(!documents || documents.length < 1) return res.json({ message: `No ${title} found in store! `});

        res.status(200).json({
            status: 'success',
            data: { [title]: documents }
        })
    });
}


// CREATE ONE ITEM SPECIFICALLY FOR STORE ONBOARDING
exports.createOneForStoreOnboarding = function(Model, title) {
    return asyncWrapper(async function(req, res) {

        const owner = await User.findById(req.user._id);
        const store = await Store.findOne({ owner: owner._id });
        if(!store) return res.json({ message: 'You don\'t have a store yet!' });

        const document = await Model.create({ ...req.body, store: store._id });

        if(title == "product") store.storeOnboard.hasFirstProduct = true;
        if(title == "deliveryRate") store.storeOnboard.hasDeliveryRate = true;
        if(title == "bank") store.storeOnboard.hasBankDetails = true;
        await store.save({});

        const { hasFirstProduct, hasDeliveryRate, hasBankDetails, hasCustomisedStore } = store.storeOnboard;
        if(hasFirstProduct && hasDeliveryRate && hasBankDetails && hasCustomisedStore) {
            owner.storeFinalSetup = true;
            await owner.save({ validateBeforeSave: false });
        }

        res.status(201).json({
            status: "success",
            message: "Created successfully!",
            data: { [title]: document },
            useFul: { user: owner, store }
        });
    })
}


// CREATE ONE GRNERIC ITEM (PROTECTED)
exports.createOne = function(Model, title) {
    return asyncWrapper(async function(req, res) {
        const document = await Model.create(req.body);

        res.status(201).json({
            status: 'success',
            message: `${capitalizeFirstLetter(title)} created successfully!`,
            data: { [title]: document }
        })
    })
}


// CREATE ONE ITEM FOR STORE AND BY STORE OWNER
exports.createOneForStore = function(Model, title) {
    return asyncWrapper(async function(req, res) {
        const ownerId = req.user._id;
        const store = await Store.findOne({ owner: ownerId });
        if(!store) return res.json({ message: 'You don\'t have a store yet!' });

        const document = await Model.create({ ...req.body, store: store._id });
        res.status(201).json({
            status: 'success',
            message: `${capitalizeFirstLetter(title)} created successfully!`,
            data: { [title]: document },
        })
    })
}


// UPDATE GENERIC BY ADMIN AND USER (PROTECTED)
exports.updateOne = function(Model, title) {
    return asyncWrapper(async function(req, res) {
        const { id } = req.params;
        
        const document = await Model.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        
        res.status(200).json({
            status: "success",
            message: `${capitalizeFirstLetter(title)} updated successfully!`,
            data: { [title]: document }
        })
    })
}


// DELETE GENERIC BY ADMIN AND USER (PROTECTED)
exports.deleteOne = function(Model, title) {
    return asyncWrapper(async function(req, res) {
        const { id } = req.params;

        await Model.findByIdAndDelete(id);

        res.status(204).json({
            status: "success",
            message: `${capitalizeFirstLetter(title)} deleted successfully!`,
            data: null
        })
    });
}


exports.deleteManyForStore = function(Model, title) {
    return asyncWrapper(async function(req, res) {
        const { ids } = req.body;

        await Model.deleteMany({ id: { $in: ids } });

        res.status(204).json({
            status: "success",
            message: `${capitalizeFirstLetter(title)} deleted successfully!`,
            data: null
        })
    })
}

// 
exports.uploadOneImage = function(Model, title) {
    return asyncWrapper(async function(req, res) {
        const { id } = req.params;

        const document = await Model.findById(id);
        if(!document) return res.json({ message: `Document not found!` });

        let image;
        console.log(req.file)
        if(title === "logo") {
            if(req.file) image = `/assets/logos/${req.file.filename}`;
            document.logo = image;
        } else {
            if(req.file) image = `/assets/groups/${req.file.filename}`;
            document.image = image;
        }

        await document.save({});
    
        res.status(200).json({
            status: 'success',
            message: `${capitalizeFirstLetter(title)} image uploaded!`
        });
    })
}


// if(title == "product" && docs.length > 0) {
//     console.log(docs);
//     store.storeOnboard.hasFirstProduct = true;
//     await store.save({});
// }

// useful: { data: { owner, store } }
