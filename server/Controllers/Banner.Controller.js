const createError = require('http-errors');
const mongoose = require('mongoose');

const Banner = require('../Models/Banner.model');
// const imageSchema = require('../Models/image.model');

const fs = require('fs');

module.exports = {
  getAllBanners: async (req, res, next) => {
    try {
      const results = await Banner.find({});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewBanner: async (req, res, next) => {
    try {
      const file = req.file;
      if(!file){
          const error = new Error('Please choose file');
          error.httpStatusCode = 400;
          return next(error)
      }

      let img = fs.readFileSync(file.path);

      let encode_image = img.toString("base64");
      let finalImg = {
        filename: file.originalname,
        contentType: file.mimetype,
        imageBase64: encode_image,
      };
      /*
       const banner = new Banner(finalImg); 
       No need for this as this will assign new '_id' to doc and '_id' is immutable in MongoDB */

      const id = req.params.id;
      const updates = finalImg;
      // const options = { new: true };

      const result = await Banner.findByIdAndUpdate(id, updates);
      if (!result) {
        throw createError(404, "Banner does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid Banner Id"));
      }
    }
    // banner
    //   .save()
    //   .then(result => {
    //     res.send(result);
    //   })
    //   .catch(err => {
    //     console.log(err.message);
    //   });
  },

  findBannerById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const banner = await Banner.findById(id);
      // const Banner = await Banner.findOne({ _id: id });
      if (!banner) {
        throw createError(404, 'Banner does not exist.');
      }
      res.send(banner);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Banner id'));
        return;
      }
      next(error);
    }
  },

  updateABanner: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Banner.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Banner does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Banner Id'));
      }

      next(error);
    }
  },

  deleteABanner: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Banner.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'Banner does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Banner id'));
        return;
      }
      next(error);
    }
  },
};

