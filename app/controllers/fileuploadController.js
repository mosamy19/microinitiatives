const { validationResult } = require("express-validator");
const Image = require("../models/Image");
const { resourceError, serverError } = require("../utils/error");
const errorFormatter = require("../utils/errorFormatter");
const { status } = require("../utils/status");

module.exports = {
  uploadMulipleFiles: async (req, res) => {
    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(status.bad).json(errors.mapped());
    }

    let newImages = new Image({ images: [] });

    if (req.files === null) {
      return resourceError(res, "No file Uploaded");
    }

    // if (req.file) {
    //   newImages.images = `/uploads/${req.file.filename}`;
    // }

    if (req.files) {
      for (let file of req.files) {
        newImages.images = [...newImages.images, `/uploads/${file.filename}`];
      }
    }

    try {
      let uploadedImages = await newImages.save();
      res.status(200).json(uploadedImages);
    } catch (error) {
      serverError(res, error);
    }
  },
  getUploadedImages: async (req, res) => {
    // const { imageId } = req.params;
    try {
      let images = await Image.find();
      res.status(200).json(images);
    } catch (error) {
      console.log(error);
      serverError(res, error);
    }
  },
  deleteUploadedImage: async (req, res) => {
    let { imageId } = req.params;
    try {
      let images = await Image.findOneAndDelete({
        _id: imageId,
      });
      if (!images) {
        return resourceError(res, "No images Found");
      }
      res.status(200).json({ message: "Deleted successfully", images });
    } catch (error) {
      serverError(res, error);
    }
  },
};
