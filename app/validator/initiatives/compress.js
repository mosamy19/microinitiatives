const Jimp = require("jimp");
/**
 * Resize + optimize images.
 *
 * @param Array images An array of images paths.
 * @param Number width A number value of width e.g. 1920.
 * @param Number height Optional number value of height e.g. 1080.
 * @param Number quality Optional number value of quality of the image e.g. 90.
 */

module.exports = async (images, width, height, quality) => {
  try {
    await Promise.all(
      images.map(async (item) => {
        const image = await Jimp.read(item.imgPath);
        await image.contain(783, 410);
        await image.background(0xffffffff);
        await image.quality(quality);
        await image.resize(width, height, Jimp.RESIZE_NEAREST_NEIGHBOR);

        await image.writeAsync(item.imgPath);
      })
    );
  } catch (error) {
    console.log(error);
  }
};
