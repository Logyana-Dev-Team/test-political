const createError = require('http-errors');
const mongoose = require('mongoose');

const Sampark = require('../Models/Sampark.model');

module.exports = {
  getAllSamparks: async (req, res, next) => {
    try {
      const results = await Sampark.find({}, { __v: 0 });
      // const results = await Sampark.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Sampark.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

   createNewSampark: async (req, res, next) => {
    
  // try {
  //     const Sampark = new Sampark(req.body);
  //     const result = await Sampark.save();
  //     res.send(result);
  //   } catch (error) {
  //     console.log(error.message);
  //     if (error.name === 'ValidationError') {
  //       next(createError(422, error.message));
  //       return;
  //     }
  //     next(error);
  //   }

    /*Or:
  If you want to use the Promise based approach*/
    
  const sampark = new Sampark({
    number: req.body.number,
    message: req.body.message
  });
  sampark
    .save()
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => {
      console.log(err.message);
    }); 
    
  },

  findSamparkById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const sampark = await Sampark.findById(id);
      // const Sampark = await Sampark.findOne({ _id: id });
      if (!sampark) {
        throw createError(404, 'Sampark does not exist.');
      }
      res.send(sampark);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Sampark id'));
        return;
      }
      next(error);
    }
  },

//   updateASampark: async (req, res, next) => {
//     try {
//       const id = req.params.id;
//       const updates = req.body;
//       const options = { new: true };

//       const result = await Sampark.findByIdAndUpdate(id, updates, options);
//       if (!result) {
//         throw createError(404, 'Sampark does not exist');
//       }
//       res.send(result);
//     } catch (error) {
//       console.log(error.message);
//       if (error instanceof mongoose.CastError) {
//         return next(createError(400, 'Invalid Sampark Id'));
//       }

//       next(error);
//     }
//   },

  deleteASampark: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Sampark.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'Sampark does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Sampark id'));
        return;
      }
      next(error);
    }
  }
};
