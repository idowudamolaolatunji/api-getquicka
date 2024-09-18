const ShippingMethod = require("../models/shippingMethodModel");
const Store = require("../models/storeModel");
const { asyncWrapper } = require("../utils/handlers");
const refactory = require('../controllers/handleRefactory');

//////////////////////////////////////////////
//// SHIPPING METHOD LOGIC  ////
//////////////////////////////////////////////
exports.createShippingMethod = asyncWrapper(async function(req, res) {
    const id = req.user._id;
    const { title, shippingType, fee, description, locations, visible } = req.body;

    const store = await Store.findOne({ owner: id });
    if(!store) return res.json({ message: 'You don\'t have a store yet!' });

    const newShippingMethod = await ShippingMethod.create({
        store: store._id,
        title,
        shippingType,
        fee,
        description,
        locations,
        visible,
    });

    res.status(201).json({
        status: 'success',
        message: 'Shipping method created!',
        data: { shippingMethod: newShippingMethod }
    });
});


exports.getAllShippingMethod = refactory.getAll(ShippingMethod, 'shippingMethods');
exports.getOneShippingMethod = refactory.getOne(ShippingMethod, 'shipping');


exports.getShippingMethodsByStoreId = asyncWrapper(async function(req, res) {
    const { id } = req.params;

    const shippingMethods = await ShippingMethod.find({ store: id }).sort({ createdAt: -1 });
    if(!shippingMethods || shippingMethods.length < 1) return res.json({
        message: 'No Shipping methods in the store',
    });

    res.status(200).json({
        status: 'success',
        data: { shippingMethods }
    })
});


exports.updateShippingMethod = refactory.updateOne(ShippingMethod, 'shipping');
exports.deleteShippingMethod = refactory.deleteOne(ShippingMethod, 'shipping');