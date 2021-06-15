const fs = require("fs");
const mime = require("mime");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { AppError, errorMessage } = require("../helpers/appError");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = `./public/upload`;
    console.log(req.file);
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const id = uuidv4();
    console.log(file);
    cb(null, `${id}.${mime.getExtension(file.mimetype)}`);
  },
});

const multerMiddleware = multer({
  storage,
  fileFilter: function (req, file, cb) {
    return cb(null, true);
    // if (!["csv", "xls"].includes(mime.getExtension(file.mimetype))) {
    //   req.fileValidationError = "Invalid file type";
    //   return cb(null, false, req.fileValidationError);
    // } else {
    //   return cb(null, true);
    // }
  },
});

const fileExtCheck = (req, res, next) => {
  if (req.fileValidationError) {
    throw new AppError(errorMessage.BAD_REQUEST);
  } else {
    next();
  }
};

module.exports = { fileExtCheck, multerMiddleware };
