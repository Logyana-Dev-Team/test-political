const createError = require('http-errors');
const mongoose = require('mongoose');

const Mahiti = require('../Models/Mahiti.model');

module.exports = {
  getAllMahitis: async (req, res, next) => {
    try {
      const results = await Mahiti.find({}, { __v: 0 });
      // const results = await Mahiti.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Mahiti.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

   createNewMahiti: async (req, res, next) => {
    
  // try {
  //     const mahiti = new Mahiti(req.body);
  //     const result = await mahiti.save();
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
    
  const mahiti = new Mahiti({
    name: req.body.name,
    dob: req.body.dob,
    desc1: req.body.desc1,
    desc2: req.body.desc2,
    facebook: req.body.facebook,
    instagram: req.body.instagram, 
    gmail: req.body.gmail,
    whatsapp: req.body.whatsapp,
    playstore: req.body.playstore,
    number:req.body.number
  });
  mahiti
    .save()
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => {
      console.log(err.message);
    }); 
    
  },

  findMahitiById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const mahiti = await Mahiti.findById(id);
      // const mahiti = await Mahiti.findOne({ _id: id });
      if (!mahiti) {
        throw createError(404, 'Mahiti does not exist.');
      }
      res.send(mahiti);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Mahiti id'));
        return;
      }
      next(error);
    }
  },

  updateAMahiti: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Mahiti.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Mahiti does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Mahiti Id'));
      }

      next(error);
    }
  },

  // deleteAMahiti: async (req, res, next) => {
  //   const id = req.params.id;
  //   try {
  //     const result = await Mahiti.findByIdAndDelete(id);
  //     // console.log(result);
  //     if (!result) {
  //       throw createError(404, 'Mahiti does not exist.');
  //     }
  //     res.send(result);
  //   } catch (error) {
  //     console.log(error.message);
  //     if (error instanceof mongoose.CastError) {
  //       next(createError(400, 'Invalid Mahiti id'));
  //       return;
  //     }
  //     next(error);
  //   }
  // }
};
