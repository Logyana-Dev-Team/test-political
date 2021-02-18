const createError = require('http-errors');
const mongoose = require('mongoose');

const Videos = require('../Models/Videos.model');

module.exports = {
  getAllVideoss: async (req, res, next) => {
    try {
      const results = await Videos.find({}, { __v: 0 });
      // const results = await Videos.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Videos.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

   createNewVideos: async (req, res, next) => {
   
  const videos = new Videos({
    link:req.body.link
  });
  videos
    .save()
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => {
      console.log(err.message);
    }); 
    
  },

  findVideosById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const videos = await Videos.findById(id);
      // const videos = await Videos.findOne({ _id: id });
      if (!videos) {
        throw createError(404, 'Videos does not exist.');
      }
      res.send(videos);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Videos id'));
        return;
      }
      next(error);
    }
  },

  updateAVideos: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Videos.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Videos does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Videos Id'));
      }

      next(error);
    }
  },

  deleteAVideos: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Videos.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'Videos does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Videos id'));
        return;
      }
      next(error);
    }
  }
};
