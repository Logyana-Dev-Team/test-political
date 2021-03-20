const createError = require("http-errors");
const mongoose = require("mongoose");

const Profile = require("../Models/Profile.model");
// const imageSchema = require('../Models/image.model');

const fs = require("fs");

module.exports = {
  getAllProfiles: async (req, res, next) => {
    try {
      const results = await Profile.find({});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewProfile: async (req, res, next) => {
    try {
      const fileURL=req.body.fileURL
      // // const file = req.file;
      // if(!file){
      //     const error = new Error('Please choose file');
      //     error.httpStatusCode = 400;
      //     return next(error)
      // }

      let finalImg = {
        filename: fileURL,
      };
      // const profile = new Profile(finalImg);

      const id = req.params.id;
      const updates = finalImg;
      // const options = { new: true };

      const result = await Profile.findByIdAndUpdate(id, updates);
      if (!result) {
        throw createError(404, "Profile does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid Profile Id"));
      }
    }
    // profile
    //   .save()
    //   .then(result => {
    //     res.send(result);
    //   })
    //   .catch(err => {
    //     console.log(err.message);
    //   });
  },

  findProfileById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const profile = await Profile.findById(id);
      // const Profile = await Profile.findOne({ _id: id });
      if (!profile) {
        throw createError(404, "Profile does not exist.");
      }
      res.send(profile);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Profile id"));
        return;
      }
      next(error);
    }
  },

  updateAProfile: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Profile.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, "Profile does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid Profile Id"));
      }

      next(error);
    }
  },

  deleteAProfile: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Profile.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, "Profile does not exist.");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Profile id"));
        return;
      }
      next(error);
    }
  },
};
