const multer = require("multer");
const Storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./images");
    },
    filename: function(req, file, cb) {
        const images = Date.now() + '.png';
        cb(null, file.fieldname + images);
    },
});
const upload = multer({
    storage: Storage,
    limits: { _fileSize: 1024 * 10 },
    fileFilter: function(req, file, cb) {
        if (
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/gif" ||
            file.mimetype === "video/mp4" ||
            "application/pdf"
        ) {
            cb(null, true);
        } else {
            cb(new Error("Image upload is not of type jpg jpeg gif ...", false));
        }
    },
});
module.exports = upload;