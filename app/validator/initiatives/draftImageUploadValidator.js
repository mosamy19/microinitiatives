const path = require("path");
const fs = require("fs");
const { status } = require("../../utils/status");
const compress = require("./compress");

module.exports = (req, res, next) => {
  const types = /jpeg|jpg|png|gif/;
  //   if (req.files.length === 0 && !req.body.thumbnailUri) {
  //     return res.status(status.bad).json({
  //       thumbnail: "هذه الخانة مطلوبة",
  //     });
  //   }
  for (let file of req.files) {
    const extName = types.test(path.extname(file.originalname).toLowerCase());
    const mimeType = types.test(file.mimetype);
    if (!extName && !mimeType) {
      if (file.path) {
        fs.unlinkSync(file.path);
      }
      return res.status(status.bad).json({
        thumbnail: "only support images",
      });
    }
    if (file.path) {
      compress([{ imgPath: file.path }], 783, 410, 99);
    }
    if (file.size > 1024 * 1024 * 5) {
      if (file.path) {
        fs.unlinkSync(file.path);
      }
      return res.status(status.bad).json({
        thumbnail: "File too large, must be within 5MB",
      });
    }
  }
  next();
};
