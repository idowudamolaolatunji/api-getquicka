const Store = require("../models/storeModel");
const { asyncWrapper } = require("../utils/handlers");
const { capitalizeFirstLetter } = require("../utils/helpers");



exports.getAll = function(Model, title, { limitTO=25, sortBy={createdAt: -1} }) {
    return asyncWrapper(async function(_, res) {
        const documents = await Model.find().limit(limitTO).sort(sortBy);

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


exports.createOne = function(Model, title) {
    return asyncWrapper(async function(req, res) {
        const document = await Model.create(req.body);

        res.status(200).json({
            status: 'success',
            message: `${capitalizeFirstLetter(title)} created successfully!`,
            data: { [title]: document }
        })
    })
}

exports.createOneForStore = function(Model, title) {
    return asyncWrapper(async function(req, res) {
        const store = await Store.findOne({ owner: req.user._id });
        if(!store) return res.json({ message: 'You don\'t have a store yet!' });

        const document = await Model.create({ ...req.body, store: store._id });

        res.status(200).json({
            status: 'success',
            message: `${capitalizeFirstLetter(title)} created successfully!`,
            data: { [title]: document }
        })
    })
}

exports.uploadOneImage = function(Model, title) {
    return asyncWrapper(async function(req, res) {
        const { id } = req.params;

        const document = await Model.findById(id);
        if(!document) return res.json({ message: `Document not found!` });

        let image;
        if(req.file) image = req.file.filename;
    
        // await Model.findByIdAndUpdate(id, { image }, {
        //     new: true,
        //     runValidators: true,
        // });
        
        document.image = image;
        await document.save({});
    
        res.status(200).json({
            status: 'success',
            message: `${capitalizeFirstLetter(title)} image uploaded!`
        });
    })
}


exports.getOne = function(Model, title) {
    return asyncWrapper(async function(req, res) {
        const { id } = req.params;
        const document = await Model.findOne(id);

        if(!document) return res.json({ message: `No ${title} found with that ID` });

        res.status(200).json({
            status: 'success',
            data: { [title]: document }
        })
    })
}


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