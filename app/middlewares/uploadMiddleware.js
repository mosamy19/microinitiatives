const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const extName = path.extname(file.originalname).toLocaleLowerCase();
    cb(null, file.fieldname + "_" + Date.now() + extName);
  },
});

const upload = multer({
  storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 6,
  // },

  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});

module.exports = upload;
