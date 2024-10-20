const DeliveryRate = require("../models/deliveryRatesModel");
const Store = require("../models/storeModel");
const User = require("../models/userModel");
const { asyncWrapper } = require("../utils/handlers");
const refactory = require('./handleRefactory');

//////////////////////////////////////////////
//// SHIPPING METHOD LOGIC  ////
//////////////////////////////////////////////
exports.createDeliveryRate = asyncWrapper(async function(req, res) {
    
    const owner = await User.findById(req.user._id);
    const store = await Store.findOne({ owner: owner._id });
    if(!store) return res.json({ message: 'You don\'t have a store yet!' });

    const AlreadySeen = await DeliveryRate.findOne({ title: req.body.title });
    if(AlreadySeen) return res.json({ message: "Rate Already Exist" });

    const newDeliveryRate = await DeliveryRate.create({ ...req.body, store: store._id });
    const allRates = await DeliveryRate.find({ store: store._id });
    if(allRates.length >= 1) {
        store.storeOnboard.hasDeliveryRate = true;
        await store.save({});
    }

    res.status(201).json({
        status: 'success',
        message: 'Delivery rate created!',
        data: { deliveryRate: newDeliveryRate },
        useful: { data: { owner, store } }
    });
});


exports.getAllDeliveryRates = refactory.getAll(DeliveryRate, 'deliveryRates', {});
exports.getOneDeliveryRate = refactory.getOne(DeliveryRate, 'deliveryRate');


exports.getDeliveryRatesByStoreId = asyncWrapper(async function(req, res) {
    const { id } = req.params;

    const deliveryRates = await DeliveryRate.find({ store: id }).sort({ createdAt: -1 });
    if(!deliveryRates || deliveryRates.length < 1) return res.json({
        message: 'No delivery rates in the store',
    });

    res.status(200).json({
        status: 'success',
        data: { deliveryRates }
    })
});


exports.updateDeliveryRate = refactory.updateOne(DeliveryRate, 'rates');
exports.deleteDeliveryRate = refactory.deleteOne(DeliveryRate, 'rates');