const router = require("express").Router();
const upload = require("../middlewares/uploadMiddleware");
const {
  uploadMulipleFiles,
  getUploadedImages,
  deleteUploadedImage,
} = require("../controllers/fileuploadController");
const isAuthenticated = require("../middlewares/authenticate");

router.post("/images", upload.array("images"), uploadMulipleFiles);
router.get("/get-images/:imageId", isAuthenticated, getUploadedImages);
router.delete("/delete-images/:imageId", isAuthenticated, deleteUploadedImage);

module.exports = router;
