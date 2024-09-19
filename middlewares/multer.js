const multer = require('multer');
const sharp = require('sharp');


//////////////////////////////////////////////////
//// MULTER STORAGE ////
//////////////////////////////////////////////////
const multerStorage = multer.memoryStorage();


//////////////////////////////////////////////////
//// MULTER FILTER ////
//////////////////////////////////////////////////
const multerFilter = (req, file, cb) => {
    try {
        if (file.mimetype.startsWith('image') || file.mimetype.startsWith('application/pdf')) {
            cb(null, true);
        } else {
            throw new Error('Not a Vaild file! Please upload only accepted files');
        }
    } catch (error) {
        cb(error, false);
    }
}


//////////////////////////////////////////////////
//// MULTER UPLOAD ////
//////////////////////////////////////////////////
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: { fieldSize: 1024 * 1024 * 5 }
});


//////////////////////////////////////////////////
//// MULTER UPLOADS ////
//////////////////////////////////////////////////
exports.uploadSingleImage = upload.single('image');
exports.uploadMultipleImage = upload.array('images', 4);


//////////////////////////////////////////////////
//// SHARP RESIZE SINGLE STORE LOGO IMAGE ////
//////////////////////////////////////////////////
exports.resizeSingleLogoImage = async function (req, _, next) {
    if(!req.file) return next();
    const { id } = req.params;

    try {
        req.file.filename = `logo-${id}-${Date.now()}.jpeg`;

        await sharp(req.file.buffer)
            .resize(250, 250)
            .toFormat('jpeg')
            .jpeg({ quality: 70 })
            .toFile(`public/assets/logos/${req.file.filename}`);
        next();

    } catch(err) {
        next(err);
    }
};


//////////////////////////////////////////////////
//// SHARP RESIZE SINGLE STORE BANNER IMAGE ////
//////////////////////////////////////////////////
exports.resizeSingleBannerImage = async function (req, _, next) {
    if(!req.file) return next();
    const { id } = req.params;

    try {
        req.file.filename = `banner-${id}-${Date.now()}.jpeg`;

        await sharp(req.file.buffer)
            .resize(600, 1050)
            .toFormat('jpeg')
            .jpeg({ quality: 80 })
            .toFile(`public/assets/banners/${req.file.filename}`);
        next();

    } catch(err) {
        next(err);
    }
};

//////////////////////////////////////////////////
//// SHARP RESIZE SINGLE USER IMAGE ////
//////////////////////////////////////////////////
exports.resizeSingleUserImage = async function (req, _, next) {
    if(!req.file) return next();
    const id = req.user._id;

    try {
        req.file.filename = `user-${id}-${Date.now()}.jpeg`;

        await sharp(req.file.buffer)
            .resize(350, 350)
            .toFormat('jpeg')
            .jpeg({ quality: 80 })
            .toFile(`public/assets/users/${req.file.filename}`);
        next();

    } catch(err) {
        next(err);
    }
};

//////////////////////////////////////////////////
//// SHARP RESIZE COLLECTION / CATEGORY IMAGE ////
//////////////////////////////////////////////////
exports.resizeSingleGroupImage = async function (req, _, next) {
    if(!req.file) return next();
    const { id } = req.params;

    try {
        req.file.filename = `group-${id}-${Date.now()}.jpeg`;

        await sharp(req.file.buffer)
            .resize(350, 350)
            .toFormat('jpeg')
            .jpeg({ quality: 75 })
            .toFile(`public/assets/groups/${req.file.filename}`);
        next();

    } catch(err) {
        next(err);
    }
};
