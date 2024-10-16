const Store = require("../models/storeModel");
const User = require("../models/userModel");
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
        const owner = await User.findById(req.user._id);
        const store = await Store.findOne({ owner: owner._id });
        if(!store) return res.json({ message: 'You don\'t have a store yet!' });

        const document = await Model.create({ ...req.body, store: store._id });
        const docs = await Model.find({ store: store._id })

        if(title == "product" && docs.length > 0) {
            console.log(docs);
            store.storeOnboard.hasFirstProduct = true;
            await store.save({});
        }

        
        res.status(200).json({
            status: 'success',
            message: `${capitalizeFirstLetter(title)} created successfully!`,
            data: { [title]: document },
            useful: { data: { owner, store } }
        })
    })
}

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


exports.getOne = function(Model, title) {
    return asyncWrapper(async function(req, res) {
        const { id } = req.params;
        const document = await Model.findById(id);

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